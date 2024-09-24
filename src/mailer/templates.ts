// Strautomator Core: Mailer templates

/**
 * The base template used on all sent emails.
 */
export const EmailBaseTemplate = "<div>${contents}</div><div>-<br><small>Email sent by ${appTitle}</small><br><a href='${appUrl}' title='Strautomator'>${appUrl}</a></div>"

/**
 * Email templates.
 */
export const EmailTemplates = {
    // Below are the list of email templates (subject and body).

    // When a recipe action fails to execute.
    RecipeFailedAction: {
        subject: "Failed automation: ${recipeTitle}",
        body:
            "<p>" +
            "Hello there!<br><br>" +
            "Just to let you know that one of your automations failed to execute properly, so you might want to double check its configuration." +
            "</p>" +
            "<p>" +
            "<strong>${recipeTitle}</strong><br>" +
            "Action: ${action}<br>" +
            "Message: ${errorMessage}<br>" +
            "Activity: ID ${activityId}, on ${activityDate}" +
            "</p>" +
            "<p>" +
            "Please <a href='${appUrl}automations/edit?id=${recipeId}'>click here</a> to check the automation details on Strautomator." +
            "</p>"
    },

    // Pre alert reminder sent to user when a gear component has reached a certain % of the target usage.
    GearWearPreAlert: {
        subject: "${gearName} - ${component} (GearWear)",
        body:
            "<p>" +
            "This is a friendly reminder that this component has now reached ${usage}% of its target usage.<br>-<br>" +
            "<strong>${gearName} - ${component}</strong><br>" +
            "Currently with ${currentDistance} ${units}, ${currentTime} hours" +
            "</p>" +
            "<p>" +
            "This is a good time to double check if everything is in order with the component. ${tips}" +
            "</p>" +
            "<p>" +
            'If you wish to buy replacement parts early, check the <a href="${affiliateLink}">best deals on our affiliate stores</a>.' +
            "</p>",
        tags: {
            tips: {
                chain: "For instance, check the chain stretch and if all pins are rolling freely.",
                tires: "For instance, you might want to swap the front and rear tires to better distribute their wear.",
                cassette: "For instance, you might want to remove the cassette from the wheel to properly clean and inspect it."
            }
        }
    },

    // Alert sent to user when a gear component has passed the defined distance.
    GearWearAlert: {
        subject: "${gearName} - ${component} (GearWear)",
        body:
            "<p>" +
            "It's about time to replace this component!<br>-<br>" +
            "<strong>${gearName} - ${component}</strong><br>" +
            "Currently with ${currentDistance} ${units}, ${currentTime} hours<br>" +
            "Alert on: ${alertDetails}<br>-" +
            "</p>" +
            "<p>" +
            'To reset the current tracking, please <a href="${resetLink}">click here</a> to go to the GearWear details on Strautomator. You should do this once you have replaced the component. You can also edit the component and increase the alert threshold, if needed.' +
            "</p>" +
            "<p>" +
            'To buy replacement parts, check the <a href="${affiliateLink}">best deals on our affiliate stores</a>.' +
            "</p>"
    },

    // Reminder sent if user hasn't reset the distance on a gear component after it reaches 120% of the distance threshold.
    GearWearReminder: {
        subject: "${gearName} - ${component} (GearWear)",
        body:
            "<p>" +
            "This is a friendly reminder that you haven't reset the usage for the component below.<br>-<br>" +
            "<strong>${gearName} - ${component}</strong><br>" +
            "Currently with ${currentDistance} ${units}, ${currentTime} hours<br>" +
            "Alert on: ${alertDetails}<br>-" +
            "</p>" +
            "<p>" +
            'To reset the current tracking, please <a href="${resetLink}">click here</a> to go to the GearWear details on Strautomator. You should do this once you have replaced the component.' +
            "</p>" +
            "<p>" +
            'To buy replacement parts, check the <a href="${affiliateLink}">best deals on our affiliate stores</a>.' +
            "</p>"
    },

    // When a Strava refresh token has expired and user needs to reauthenticate.
    StravaTokenExpired: {
        subject: "Please reconnect to Strautomator",
        body:
            "<p>" +
            "Hi ${userName}!<br><br>" +
            "It looks like the connection between Strautomator and your Strava account has expired.<br>" +
            'If you wish to keep using Strautomator, please reauthenticate at <a href="${appUrl}auth/login">${appUrl}auth/login</a>' +
            "</p>"
    },

    // When user has many unread notifications.
    UnreadNotifications: {
        subject: "You have ${count} unread notifications",
        body:
            "<p>" +
            "Hi ${userName}!<br><br>" +
            "It might have been a while since you last checked your account on Strautomator... and there are some unread notifications for you:<br><br>-" +
            "${notifications}" +
            "</p>" +
            "<p>" +
            'Please go to <a href="${appUrl}account/notifications">My Notifications</a> for more details.' +
            "</p>"
    },

    // User was suspended.
    UserSuspended: {
        subject: "Your account was suspended",
        body:
            "<p>" +
            "Hi ${userName}!<br><br>" +
            "Your Strautomator account was automatically suspended due to repeated failures to fetch your Strava data." +
            "</p>" +
            "<p>" +
            'To reactivate your account, please login again at <a href="${appUrl}auth/login">${appUrl}auth/login</a>.' +
            "</p>"
    },

    // User must confirm the email address.
    ConfirmEmail: {
        subject: "Confirm your email address",
        body:
            "<p>" +
            "Hi ${userName}!<br><br>" +
            'To confirm your email address "${email}" on Strautomator, please <a href="${appUrl}account?email=${email}&token=${token}">click here</a>, ' +
            "or open the following link in your browser:<br><br>" +
            "${appUrl}account?email=${email}&token=${token}" +
            "</p>" +
            "<p>" +
            "<i>If you haven't registered an email with Strautomator, please ignore this email.</i>" +
            "</p>"
    },

    // User must confirm the email address.
    PaddleMigration: {
        subject: "Migration of your PRO subscription",
        body:
            "<p>" +
            "Hi ${userName}!<br><br>" +
            "Strautomator has a new payment provider, Paddle.com! It supports not only PayPal, but also all major credit cards, Google Pay, Apple Pay, iDEAL and Bancontact." +
            "</p>" +
            "<p>" +
            "Your Strautomator PRO subscription is scheduled to be billed via PayPal in a few days. I kindly ask that you migrate your subscription to Paddle, if possible.<br><br>As a 'thank you' gesture, you'll get a discount code, bringing the initial subscription price down from ${currentPrice} ${currency} to ${discountPrice} ${currency}.<br>Please note that we have a limited amount of discount codes. <i>First come, first serve.</i>" +
            "</p>" +
            "<p>" +
            "To get more details and proceed with the migration, please go to " +
            '<a href="${appUrl}billing/paddlemigration" title="Click to get more details about the Migration to Paddle">${appUrl}billing/paddlemigration</a>.' +
            "</p>" +
            "<p>" +
            "If you don't want to do it now, no worries, existing PayPal subscriptions will be valid at least until December 2025." +
            "</p>" +
            "<p>" +
            "Need any more information? Simply reply to this email and I'll get back to you." +
            "</p>" +
            "<p>" +
            "Kind regards,<br><br>" +
            "Igor Ramadas" +
            "</p>"
    }
}
