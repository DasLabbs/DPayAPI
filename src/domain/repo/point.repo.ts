import { Point, PointModel } from "@domain/entity/point.model";

import { BaseRepo } from "./base.repo";

export class PointRepo extends BaseRepo<Point> {
    constructor() {
        super(PointModel);
    }
}

const pointRepo = new PointRepo();
export default pointRepo;
