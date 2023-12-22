// Strautomator Core: OpenAI (ChatGPT)

import {AiProvider} from "../ai/types"
import {StravaActivity} from "../strava/types"
import {UserData} from "../users/types"
import {AxiosConfig, axiosRequest} from "../axios"
import _ from "lodash"
import logger from "anyhow"
import * as logHelper from "../loghelper"
const settings = require("setmeup").settings
const packageVersion = require("../../package.json").version

/**
 * OpenAI (ChatGPT) wrapper.
 */
export class OpenAI implements AiProvider {
    private constructor() {}
    private static _instance: OpenAI
    static get Instance() {
        return this._instance || (this._instance = new this())
    }

    // INIT
    // --------------------------------------------------------------------------

    /**
     * Init the OpenAI wrapper.
     */
    init = async (): Promise<void> => {
        try {
            if (!settings.openai.api.key) {
                throw new Error("Missing the openai.api.key setting")
            }
        } catch (ex) {
            logger.error("OpenAI.init", ex)
        }
    }

    // METHODS
    // --------------------------------------------------------------------------

    /**
     * Generate the activity name based on its parameters.
     * @param user The user.
     * @param activity The Strava activity.
     * @param prompt Prompt to be used.
     * @param maxTokens Max tokens to be used.
     */
    activityPrompt = async (user: UserData, activity: StravaActivity, prompt: string[], maxTokens: number): Promise<string> => {
        try {
            const content = prompt.join(" ")
            const options: AxiosConfig = {
                url: `${settings.openai.api.baseUrl}chat/completions`,
                method: "POST",
                headers: {},
                data: {
                    model: user.isPro && Math.random() < 0.5 ? "gpt-4-1106-preview" : "gpt-3.5-turbo",
                    messages: [
                        {role: "system", content: "You are an assistant to create creative names and descriptions for Strava activities."},
                        {role: "user", content: content}
                    ],
                    max_tokens: maxTokens,
                    temperature: 1,
                    top_p: 1
                },
                onRetry: (opt) => {
                    opt.data.model = "gpt-3.5-turbo"
                }
            }

            // Append headers.
            options.headers["Authorization"] = `Bearer ${settings.openai.api.key}`
            options.headers["User-Agent"] = `${settings.app.title} / ${packageVersion}`

            logger.debug("OpenAI.activityPrompt", logHelper.user(user), logHelper.activity(activity), `Prompt: ${content}`)

            // Here we go!
            try {
                const res = await axiosRequest(options)

                // Successful prompt response? Extract the generated activity name.
                if (res?.choices?.length > 0) {
                    const arrName = res.choices[0].message.content.split(`"`)
                    let text = arrName.length > 1 ? arrName[1] : arrName[0]

                    // Ends with a period, but has no question? Remove it.
                    if (text.substring(text.length - 1) == "." && !text.includes("?")) {
                        text = text.substring(0, text.length - 1).trim()
                    } else {
                        text = text.trim()
                    }

                    return text
                }
            } catch (innerEx) {
                logger.error("OpenAI.activityPrompt", logHelper.user(user), logHelper.activity(activity), options.data.model, innerEx)
            }

            // Failed to generate the activity name.
            logger.warn("OpenAI.activityPrompt", logHelper.user(user), logHelper.activity(activity), "Failed to generate")
            return null
        } catch (ex) {
            logger.error("OpenAI.activityPrompt", logHelper.user(user), logHelper.activity(activity), ex)
            return null
        }
    }

    /**
     * Validate a prompt against OpenAI's moderation API, returns flagged categories or null if no issues were found.
     * @param user The user triggering the validation.
     * @param prompt Prompt to be validated.
     */
    validatePrompt = async (user: UserData, prompt: string): Promise<string[]> => {
        try {
            const options: AxiosConfig = {
                url: `${settings.openai.api.baseUrl}moderations`,
                method: "POST",
                headers: {},
                data: {input: prompt}
            }

            // Append headers.
            options.headers["Authorization"] = `Bearer ${settings.openai.api.key}`
            options.headers["User-Agent"] = `${settings.app.title} / ${packageVersion}`

            // Stop if no results were returned, or if nothing was flagged.
            const res = await axiosRequest(options)
            if (!res) {
                return null
            }
            const result = res.results.find((r) => r.flagged)
            if (!result) {
                return null
            }

            // Return list of categories that failed the moderation.
            const categories = Object.keys(_.pickBy(result.categories, (i) => i == true))
            logger.info("OpenAI.validatePrompt", logHelper.user(user), prompt, `Failed: ${categories.join(", ")}`)
            return categories
        } catch (ex) {
            logger.error("OpenAI.validatePrompt", logHelper.user(user), prompt, ex)
            return null
        }
    }
}

// Exports...
export default OpenAI.Instance
