import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\AiAgentController::chat
 * @see app/Http/Controllers/AiAgentController.php:14
 * @route '/ai-agents/chat'
 */
export const chat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: chat.url(options),
    method: 'post',
})

chat.definition = {
    methods: ["post"],
    url: '/ai-agents/chat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AiAgentController::chat
 * @see app/Http/Controllers/AiAgentController.php:14
 * @route '/ai-agents/chat'
 */
chat.url = (options?: RouteQueryOptions) => {
    return chat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AiAgentController::chat
 * @see app/Http/Controllers/AiAgentController.php:14
 * @route '/ai-agents/chat'
 */
chat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: chat.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AiAgentController::chat
 * @see app/Http/Controllers/AiAgentController.php:14
 * @route '/ai-agents/chat'
 */
    const chatForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: chat.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AiAgentController::chat
 * @see app/Http/Controllers/AiAgentController.php:14
 * @route '/ai-agents/chat'
 */
        chatForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: chat.url(options),
            method: 'post',
        })
    
    chat.form = chatForm
const aiAgents = {
    chat: Object.assign(chat, chat),
}

export default aiAgents