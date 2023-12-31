import { Injectable, NotFoundException } from "@nestjs/common";
import { TrainingRepository } from "./training.repository";
import { CreateTrainingDto } from "./dto/create-training.dto";
import { Training } from "@fit-friends/shared/app-types";
import { TrainingEntity } from "./training.entity";
import { TrainingQuery } from "./query/training.query";
import { UpdateTrainingDto } from "./dto/update-training.dto";
import { getRandomItem } from "@fit-friends/util/util-core";
import { DEFAULT_STATIC_IMAGES, TrainingError } from "./training.constant";

@Injectable()
export class TrainingService {
  constructor(
    private readonly trainingRepository: TrainingRepository,

  ) {}

  async createTraining(dto: CreateTrainingDto): Promise<Training> {
    const trainingEntity = new TrainingEntity({ ...dto, backgroundImage: getRandomItem(DEFAULT_STATIC_IMAGES) });
    return this.trainingRepository.create(trainingEntity);
  }

  async deleteTraining(id: number): Promise<void> {

    const existTraining = await this.getTraining(id)

    if (!existTraining) {
      throw new NotFoundException(TrainingError.NotExistTraining);
    }

    this.trainingRepository.destroy(id);
  }

  async getTraining(id: number): Promise<Training> {
    return this.trainingRepository.findById(id);
  }

  async getTrainings(query: TrainingQuery): Promise<Training[]> {
    return this.trainingRepository.find(query);
  }

  async getTrainingsByTrainerId(trainerId: string, query: TrainingQuery): Promise<Training[]> {
    return this.trainingRepository.findByTrainerId(trainerId, query);
  }

  async updateTraining(id: number, dto: UpdateTrainingDto): Promise<Training> {
    const existTraining = await this.getTraining(id)

    if (!existTraining) {
      throw new NotFoundException(TrainingError.NotExistTraining);
    }
    return this.trainingRepository.update(id, new TrainingEntity({...dto }))
  }

}
