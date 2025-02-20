import automapperTransformerPlugin, {
    before,
} from '@automapper/classes/transformer-plugin';
import type { CompilerOptions } from 'typescript/lib/tsserverlibrary';
import {
    createProgram,
    ModuleKind,
    ScriptTarget,
    transpileModule,
} from 'typescript/lib/tsserverlibrary';
import {
    compiledCreateSkillRequestDto,
    compiledSkillEntity,
    createSkillRequestDtoText,
    skillEntityText,
} from './issues/486/models';

import {
    userModelText,
    userModelTextStrict,
    userModelTranspiledText,
    userModelTranspiledTextESM,
} from './model';

describe('Classes - Transformer Plugin', () => {
    describe('named before import', () => {
        it('should compile', () => {
            let tsConfig: CompilerOptions = {
                module: ModuleKind.CommonJS,
                target: ScriptTarget.ESNext,
                noEmitHelpers: true,
            };

            let fileName = 'user.model.ts';
            let programFixture = createProgram([fileName], tsConfig);

            let result = transpileModule(userModelText, {
                compilerOptions: tsConfig,
                fileName,
                transformers: {
                    before: [before({}, programFixture)],
                },
            });

            expect(result.outputText).toBeTruthy();
            expect(result.outputText).toEqual(userModelTranspiledText);
        });
    });
    describe('default import', () => {
        it('should compile', () => {
            let tsConfig: CompilerOptions = {
                module: ModuleKind.CommonJS,
                target: ScriptTarget.ESNext,
                noEmitHelpers: true,
            };

            let fileName = 'user.model.ts';
            let programFixture = createProgram([fileName], tsConfig);

            let result = transpileModule(userModelText, {
                compilerOptions: tsConfig,
                fileName,
                transformers: {
                    before: [
                        automapperTransformerPlugin(programFixture).before,
                    ],
                },
            });

            expect(result.outputText).toBeTruthy();
            expect(result.outputText).toEqual(userModelTranspiledText);
        });

        it('should compile for es2015', () => {
            let tsConfig: CompilerOptions = {
                module: ModuleKind.ES2015,
                target: ScriptTarget.ESNext,
                noEmitHelpers: true,
            };

            let fileName = 'user.model.ts';
            let programFixture = createProgram([fileName], tsConfig);

            let result = transpileModule(userModelText, {
                compilerOptions: tsConfig,
                fileName,
                transformers: {
                    before: [
                        automapperTransformerPlugin(programFixture).before,
                    ],
                },
            });

            expect(result.outputText).toBeTruthy();
            expect(result.outputText).toEqual(userModelTranspiledTextESM);
        });

        it('should compile strict mode', () => {
            let tsConfig: CompilerOptions = {
                module: ModuleKind.CommonJS,
                target: ScriptTarget.ESNext,
                noEmitHelpers: true,
                strict: true,
            };

            let fileName = 'user.model.ts';
            let programFixture = createProgram([fileName], tsConfig);

            let result = transpileModule(userModelTextStrict, {
                compilerOptions: tsConfig,
                fileName,
                transformers: {
                    before: [
                        automapperTransformerPlugin(programFixture).before,
                    ],
                },
            });

            expect(result.outputText).toBeTruthy();
            expect(result.outputText).toEqual(userModelTranspiledText);
        });

        it('should compile strict mode for es2015', () => {
            let tsConfig: CompilerOptions = {
                module: ModuleKind.ES2015,
                target: ScriptTarget.ESNext,
                noEmitHelpers: true,
                strict: true,
            };

            let fileName = 'user.model.ts';
            let programFixture = createProgram([fileName], tsConfig);

            let result = transpileModule(userModelTextStrict, {
                compilerOptions: tsConfig,
                fileName,
                transformers: {
                    before: [
                        automapperTransformerPlugin(programFixture).before,
                    ],
                },
            });

            expect(result.outputText).toBeTruthy();
            expect(result.outputText).toEqual(userModelTranspiledTextESM);
        });
    });
    describe('issue 486', () => {
        it('should compile', () => {
            let tsConfig: CompilerOptions = {
                module: ModuleKind.CommonJS,
                target: ScriptTarget.ESNext,
                noEmitHelpers: true,
            };

            let createSkillFileName = 'create-skill.dto.ts';
            let createSkillProgramStructure = createProgram(
                [createSkillFileName],
                tsConfig
            );
            let createSkillResult = transpileModule(
                createSkillRequestDtoText,
                {
                    compilerOptions: tsConfig,
                    fileName: createSkillFileName,
                    transformers: {
                        before: [
                            automapperTransformerPlugin(
                                createSkillProgramStructure
                            ).before,
                        ],
                    },
                }
            );
            expect(createSkillResult.outputText).toBeTruthy();
            expect(createSkillResult.outputText).toEqual(
                compiledCreateSkillRequestDto
            );

            let skillEntityFileName = 'skill.entity.ts';
            let skillEntityProgramStructure = createProgram(
                [skillEntityFileName],
                tsConfig
            );
            let skillEntityResult = transpileModule(skillEntityText, {
                compilerOptions: tsConfig,
                fileName: skillEntityFileName,
                transformers: {
                    before: [
                        automapperTransformerPlugin(skillEntityProgramStructure)
                            .before,
                    ],
                },
            });
            expect(skillEntityResult.outputText).toBeTruthy();
            expect(skillEntityResult.outputText).toEqual(compiledSkillEntity);
        });
    });
});
