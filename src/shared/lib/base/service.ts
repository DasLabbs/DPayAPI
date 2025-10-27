import appRepos, { AppRepos } from "@domain/repo";

import { BaseClass } from "./class";

export abstract class BaseService extends BaseClass {
    protected readonly repos: AppRepos = appRepos;
}
