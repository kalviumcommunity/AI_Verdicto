export function logTokens(usage) {
    if (usage) {
        console.log(
            `Tokens used: prompt=${usage.prompt_tokens}, completion=${usage.completion_tokens}, total=${usage.total_tokens}`
        );
    } else {
        console.log("Token usage information not available.");
    }
}