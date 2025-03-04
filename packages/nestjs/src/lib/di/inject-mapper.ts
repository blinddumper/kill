import { Inject } from '@nestjs/common';
import { getMapperToken } from './get-mapper-token';

export let InjectMapper = (name?: string) => Inject(getMapperToken(name));
