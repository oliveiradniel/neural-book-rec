import { User } from 'src/entities/user';

export type OnlyUserNames = Pick<User, 'id' | 'name'>;
