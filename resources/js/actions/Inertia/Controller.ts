import {
    queryParams,
    type RouteQueryOptions,
    type RouteDefinition,
    type RouteFormDefinition,
} from './../../wayfinder';
/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
const Controller980bb49ee7ae63891f1d891d2fbcf1c9 = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: Controller980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'get',
});

Controller980bb49ee7ae63891f1d891d2fbcf1c9.definition = {
    methods: ['get', 'head'],
    url: '/',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
Controller980bb49ee7ae63891f1d891d2fbcf1c9.url = (
    options?: RouteQueryOptions,
) => {
    return (
        Controller980bb49ee7ae63891f1d891d2fbcf1c9.definition.url +
        queryParams(options)
    );
};

/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
Controller980bb49ee7ae63891f1d891d2fbcf1c9.get = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: Controller980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'get',
});
/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
Controller980bb49ee7ae63891f1d891d2fbcf1c9.head = (
    options?: RouteQueryOptions,
): RouteDefinition<'head'> => ({
    url: Controller980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'head',
});

/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
const Controller980bb49ee7ae63891f1d891d2fbcf1c9Form = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: Controller980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'get',
});

/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
Controller980bb49ee7ae63891f1d891d2fbcf1c9Form.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: Controller980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'get',
});
/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
Controller980bb49ee7ae63891f1d891d2fbcf1c9Form.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: Controller980bb49ee7ae63891f1d891d2fbcf1c9.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

Controller980bb49ee7ae63891f1d891d2fbcf1c9.form =
    Controller980bb49ee7ae63891f1d891d2fbcf1c9Form;
/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
 */
const Controller42a740574ecbfbac32f8cc353fc32db9 = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: Controller42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'get',
});

Controller42a740574ecbfbac32f8cc353fc32db9.definition = {
    methods: ['get', 'head'],
    url: '/dashboard',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
 */
Controller42a740574ecbfbac32f8cc353fc32db9.url = (
    options?: RouteQueryOptions,
) => {
    return (
        Controller42a740574ecbfbac32f8cc353fc32db9.definition.url +
        queryParams(options)
    );
};

/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
 */
Controller42a740574ecbfbac32f8cc353fc32db9.get = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: Controller42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'get',
});
/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
 */
Controller42a740574ecbfbac32f8cc353fc32db9.head = (
    options?: RouteQueryOptions,
): RouteDefinition<'head'> => ({
    url: Controller42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'head',
});

/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
 */
const Controller42a740574ecbfbac32f8cc353fc32db9Form = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: Controller42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'get',
});

/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
 */
Controller42a740574ecbfbac32f8cc353fc32db9Form.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: Controller42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'get',
});
/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
 */
Controller42a740574ecbfbac32f8cc353fc32db9Form.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: Controller42a740574ecbfbac32f8cc353fc32db9.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

Controller42a740574ecbfbac32f8cc353fc32db9.form =
    Controller42a740574ecbfbac32f8cc353fc32db9Form;
/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/ai-agents'
 */
const Controller232373acafcda22418c3cf92a309a254 = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: Controller232373acafcda22418c3cf92a309a254.url(options),
    method: 'get',
});

Controller232373acafcda22418c3cf92a309a254.definition = {
    methods: ['get', 'head'],
    url: '/ai-agents',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/ai-agents'
 */
Controller232373acafcda22418c3cf92a309a254.url = (
    options?: RouteQueryOptions,
) => {
    return (
        Controller232373acafcda22418c3cf92a309a254.definition.url +
        queryParams(options)
    );
};

/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/ai-agents'
 */
Controller232373acafcda22418c3cf92a309a254.get = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: Controller232373acafcda22418c3cf92a309a254.url(options),
    method: 'get',
});
/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/ai-agents'
 */
Controller232373acafcda22418c3cf92a309a254.head = (
    options?: RouteQueryOptions,
): RouteDefinition<'head'> => ({
    url: Controller232373acafcda22418c3cf92a309a254.url(options),
    method: 'head',
});

/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/ai-agents'
 */
const Controller232373acafcda22418c3cf92a309a254Form = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: Controller232373acafcda22418c3cf92a309a254.url(options),
    method: 'get',
});

/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/ai-agents'
 */
Controller232373acafcda22418c3cf92a309a254Form.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: Controller232373acafcda22418c3cf92a309a254.url(options),
    method: 'get',
});
/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/ai-agents'
 */
Controller232373acafcda22418c3cf92a309a254Form.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: Controller232373acafcda22418c3cf92a309a254.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

Controller232373acafcda22418c3cf92a309a254.form =
    Controller232373acafcda22418c3cf92a309a254Form;
/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/material-repository'
 */
const Controller73cd8463294e44a33d168ae9c0ce7167 = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: Controller73cd8463294e44a33d168ae9c0ce7167.url(options),
    method: 'get',
});

Controller73cd8463294e44a33d168ae9c0ce7167.definition = {
    methods: ['get', 'head'],
    url: '/material-repository',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/material-repository'
 */
Controller73cd8463294e44a33d168ae9c0ce7167.url = (
    options?: RouteQueryOptions,
) => {
    return (
        Controller73cd8463294e44a33d168ae9c0ce7167.definition.url +
        queryParams(options)
    );
};

/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/material-repository'
 */
Controller73cd8463294e44a33d168ae9c0ce7167.get = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: Controller73cd8463294e44a33d168ae9c0ce7167.url(options),
    method: 'get',
});
/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/material-repository'
 */
Controller73cd8463294e44a33d168ae9c0ce7167.head = (
    options?: RouteQueryOptions,
): RouteDefinition<'head'> => ({
    url: Controller73cd8463294e44a33d168ae9c0ce7167.url(options),
    method: 'head',
});

/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/material-repository'
 */
const Controller73cd8463294e44a33d168ae9c0ce7167Form = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: Controller73cd8463294e44a33d168ae9c0ce7167.url(options),
    method: 'get',
});

/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/material-repository'
 */
Controller73cd8463294e44a33d168ae9c0ce7167Form.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: Controller73cd8463294e44a33d168ae9c0ce7167.url(options),
    method: 'get',
});
/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/material-repository'
 */
Controller73cd8463294e44a33d168ae9c0ce7167Form.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: Controller73cd8463294e44a33d168ae9c0ce7167.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

Controller73cd8463294e44a33d168ae9c0ce7167.form =
    Controller73cd8463294e44a33d168ae9c0ce7167Form;
/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/settings/appearance'
 */
const Controllere19ee86e9cf603ce1a59a1ec5d21dec5 = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: Controllere19ee86e9cf603ce1a59a1ec5d21dec5.url(options),
    method: 'get',
});

Controllere19ee86e9cf603ce1a59a1ec5d21dec5.definition = {
    methods: ['get', 'head'],
    url: '/settings/appearance',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/settings/appearance'
 */
Controllere19ee86e9cf603ce1a59a1ec5d21dec5.url = (
    options?: RouteQueryOptions,
) => {
    return (
        Controllere19ee86e9cf603ce1a59a1ec5d21dec5.definition.url +
        queryParams(options)
    );
};

/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/settings/appearance'
 */
Controllere19ee86e9cf603ce1a59a1ec5d21dec5.get = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: Controllere19ee86e9cf603ce1a59a1ec5d21dec5.url(options),
    method: 'get',
});
/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/settings/appearance'
 */
Controllere19ee86e9cf603ce1a59a1ec5d21dec5.head = (
    options?: RouteQueryOptions,
): RouteDefinition<'head'> => ({
    url: Controllere19ee86e9cf603ce1a59a1ec5d21dec5.url(options),
    method: 'head',
});

/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/settings/appearance'
 */
const Controllere19ee86e9cf603ce1a59a1ec5d21dec5Form = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: Controllere19ee86e9cf603ce1a59a1ec5d21dec5.url(options),
    method: 'get',
});

/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/settings/appearance'
 */
Controllere19ee86e9cf603ce1a59a1ec5d21dec5Form.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: Controllere19ee86e9cf603ce1a59a1ec5d21dec5.url(options),
    method: 'get',
});
/**
 * @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/settings/appearance'
 */
Controllere19ee86e9cf603ce1a59a1ec5d21dec5Form.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: Controllere19ee86e9cf603ce1a59a1ec5d21dec5.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

Controllere19ee86e9cf603ce1a59a1ec5d21dec5.form =
    Controllere19ee86e9cf603ce1a59a1ec5d21dec5Form;

/**
 * Multiple routes resolve to \Inertia\Controller::Controller, so this export is a
 * dictionary keyed by URI rather than a callable. Call a specific route with `Controller['<uri>'](...)`,
 * or import the route by name from your generated `routes/` directory.
 */
const Controller = {
    '/': Controller980bb49ee7ae63891f1d891d2fbcf1c9,
    '/dashboard': Controller42a740574ecbfbac32f8cc353fc32db9,
    '/ai-agents': Controller232373acafcda22418c3cf92a309a254,
    '/material-repository': Controller73cd8463294e44a33d168ae9c0ce7167,
    '/settings/appearance': Controllere19ee86e9cf603ce1a59a1ec5d21dec5,
};

export default Controller;
