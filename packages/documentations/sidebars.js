// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
let sidebars = {
    // By default, Docusaurus generates a sidebar from the docs folder structure
    // tutorialSidebar: [{ type: 'autogenerated', dirName: '.' }],
    docs: [
        {
            type: 'category',
            label: 'Getting Started',
            items: [
                'getting-started/overview',
                'getting-started/migrate-to-automapper-v8',
                'getting-started/installation',
            ],
        },
        {
            type: 'category',
            label: 'Tutorial',
            items: [
                'tutorial/preface',
                'tutorial/create-mapper',
                'tutorial/create-mapping',
                'tutorial/mapping-configurations',
                'tutorial/mapping-profile',
            ],
        },
        {
            type: 'category',
            label: 'Fundamentals',
            items: [
                'fundamentals/mapper',
                'fundamentals/mapping',
                'fundamentals/naming-convention',
                'fundamentals/auto-flattening',
                'fundamentals/mutation',
            ],
        },
        {
            type: 'category',
            label: 'Mapping Configuration',
            items: [
                'mapping-configuration/overview',
                'mapping-configuration/after-map',
                'mapping-configuration/auto-map',
                'mapping-configuration/before-map',
                'mapping-configuration/construct-using',
                'mapping-configuration/extend',
                {
                    type: 'category',
                    label: 'ForMember',
                    items: [
                        'mapping-configuration/for-member/overview',
                        'mapping-configuration/for-member/ignore',
                        'mapping-configuration/for-member/map-from',
                        'mapping-configuration/for-member/condition',
                        'mapping-configuration/for-member/from-value',
                        'mapping-configuration/for-member/map-with',
                        'mapping-configuration/for-member/convert-using',
                        'mapping-configuration/for-member/null-substitution',
                        'mapping-configuration/for-member/undefined-substitution',
                        'mapping-configuration/for-member/map-with-arguments',
                        'mapping-configuration/for-member/map-defer',
                    ],
                },
                'mapping-configuration/for-self',
                'mapping-configuration/naming-conventions',
                'mapping-configuration/type-converters',
            ],
        },
        {
            type: 'category',
            label: 'Strategies',
            items: [
                'strategies/classes',
                'strategies/pojos',
                'strategies/mikro',
                'strategies/sequelize',
            ],
        },
        {
            type: 'category',
            label: 'Miscellaneous',
            items: [
                'misc/transformer-plugin',
                'misc/mapped-types',
                'misc/self-mapping',
                'misc/fake-async',
            ],
        },
        'nestjs',
    ],
    api: [
        {
            type: 'category',
            label: 'Core',
            items: [
                {
                    type: 'autogenerated',
                    dirName: 'api/core',
                },
            ],
        },
        {
            type: 'category',
            label: 'Classes',
            items: [
                {
                    type: 'autogenerated',
                    dirName: 'api/classes',
                },
            ],
        },
        {
            type: 'category',
            label: 'POJOs',
            items: [
                {
                    type: 'autogenerated',
                    dirName: 'api/pojos',
                },
            ],
        },
        {
            type: 'category',
            label: 'Mikro',
            items: [
                {
                    type: 'autogenerated',
                    dirName: 'api/mikro',
                },
            ],
        },
        {
            type: 'category',
            label: 'Sequelize',
            items: [
                {
                    type: 'autogenerated',
                    dirName: 'api/sequelize',
                },
            ],
        },
        {
            type: 'category',
            label: 'NestJS',
            items: [
                {
                    type: 'autogenerated',
                    dirName: 'api/nestjs',
                },
            ],
        },
    ],
};

module.exports = sidebars;
