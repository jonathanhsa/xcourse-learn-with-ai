import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\GoogleAuthController::redirectToGoogle
 * @see app/Http/Controllers/Auth/GoogleAuthController.php:16
 * @route '/auth/google'
 */
export const redirectToGoogle = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redirectToGoogle.url(options),
    method: 'get',
})

redirectToGoogle.definition = {
    methods: ["get","head"],
    url: '/auth/google',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\GoogleAuthController::redirectToGoogle
 * @see app/Http/Controllers/Auth/GoogleAuthController.php:16
 * @route '/auth/google'
 */
redirectToGoogle.url = (options?: RouteQueryOptions) => {
    return redirectToGoogle.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\GoogleAuthController::redirectToGoogle
 * @see app/Http/Controllers/Auth/GoogleAuthController.php:16
 * @route '/auth/google'
 */
redirectToGoogle.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redirectToGoogle.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\GoogleAuthController::redirectToGoogle
 * @see app/Http/Controllers/Auth/GoogleAuthController.php:16
 * @route '/auth/google'
 */
redirectToGoogle.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: redirectToGoogle.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\GoogleAuthController::redirectToGoogle
 * @see app/Http/Controllers/Auth/GoogleAuthController.php:16
 * @route '/auth/google'
 */
    const redirectToGoogleForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: redirectToGoogle.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\GoogleAuthController::redirectToGoogle
 * @see app/Http/Controllers/Auth/GoogleAuthController.php:16
 * @route '/auth/google'
 */
        redirectToGoogleForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: redirectToGoogle.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\GoogleAuthController::redirectToGoogle
 * @see app/Http/Controllers/Auth/GoogleAuthController.php:16
 * @route '/auth/google'
 */
        redirectToGoogleForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: redirectToGoogle.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    redirectToGoogle.form = redirectToGoogleForm
/**
* @see \App\Http\Controllers\Auth\GoogleAuthController::handleGoogleCallback
 * @see app/Http/Controllers/Auth/GoogleAuthController.php:24
 * @route '/auth/google/callback'
 */
export const handleGoogleCallback = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: handleGoogleCallback.url(options),
    method: 'get',
})

handleGoogleCallback.definition = {
    methods: ["get","head"],
    url: '/auth/google/callback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\GoogleAuthController::handleGoogleCallback
 * @see app/Http/Controllers/Auth/GoogleAuthController.php:24
 * @route '/auth/google/callback'
 */
handleGoogleCallback.url = (options?: RouteQueryOptions) => {
    return handleGoogleCallback.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\GoogleAuthController::handleGoogleCallback
 * @see app/Http/Controllers/Auth/GoogleAuthController.php:24
 * @route '/auth/google/callback'
 */
handleGoogleCallback.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: handleGoogleCallback.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\GoogleAuthController::handleGoogleCallback
 * @see app/Http/Controllers/Auth/GoogleAuthController.php:24
 * @route '/auth/google/callback'
 */
handleGoogleCallback.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: handleGoogleCallback.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\GoogleAuthController::handleGoogleCallback
 * @see app/Http/Controllers/Auth/GoogleAuthController.php:24
 * @route '/auth/google/callback'
 */
    const handleGoogleCallbackForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: handleGoogleCallback.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\GoogleAuthController::handleGoogleCallback
 * @see app/Http/Controllers/Auth/GoogleAuthController.php:24
 * @route '/auth/google/callback'
 */
        handleGoogleCallbackForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: handleGoogleCallback.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\GoogleAuthController::handleGoogleCallback
 * @see app/Http/Controllers/Auth/GoogleAuthController.php:24
 * @route '/auth/google/callback'
 */
        handleGoogleCallbackForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: handleGoogleCallback.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    handleGoogleCallback.form = handleGoogleCallbackForm
const GoogleAuthController = { redirectToGoogle, handleGoogleCallback }

export default GoogleAuthController