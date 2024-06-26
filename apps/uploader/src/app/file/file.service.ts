import { uploaderConfig } from '@fit-friends/config/config-uploader';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ensureDir } from 'fs-extra';
import {  unlink, writeFile } from 'node:fs/promises';
import dayjs from 'dayjs';
import * as crypto from 'node:crypto';
import { FileEntity } from './file.entity';
import { FileRepository } from './file.repository';
import { extension } from 'mime-types';


type WritedFile = {
  hashName: string;
  fileExtension: string | boolean;
  subDirectory: string;
  path: string;
}

@Injectable()
export class FileService {
  constructor(
    @Inject(uploaderConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof uploaderConfig>,
    private readonly fileRepository: FileRepository,
  ) {}

  private async writeFile(file: Express.Multer.File): Promise<WritedFile> {
    const [ year, month ] = dayjs().format('YYYY MM').split(' ');
    const { uploadDirectory } = this.applicationConfig;
    const subDirectory = `${year}/${month}`;

    const uuid = crypto.randomUUID();
    const fileExtension = extension(file.mimetype);
    const hashName = `${uuid}.${fileExtension}`;

    const uploadDirectoryPath = `${uploadDirectory}/${subDirectory}`;
    const destinationFile = `${uploadDirectoryPath}/${hashName}`;

    await ensureDir(uploadDirectoryPath);
    await writeFile(destinationFile, file.buffer);

    return {
      hashName,
      fileExtension,
      subDirectory,
      path: `/${subDirectory}/${hashName}`,
    };
  }

  private async deleteFile(path: string) {
    const { uploadDirectory } = this.applicationConfig;
    const uploadDirectoryPath = `${uploadDirectory}${path}`;

   await unlink(uploadDirectoryPath)
  }

  public async saveFile(file: Express.Multer.File) {
    const writedFile = await this.writeFile(file);
    const newFile = new FileEntity({
      size: file.size,
      hashName: writedFile.hashName,
      mimetype: file.mimetype,
      originalName: file.originalname,
      path: writedFile.path,
    });

    return this.fileRepository.create(newFile);
  }

  public async removeFile(path: string) {
    await this.deleteFile(path);
    return this.fileRepository.destroy(path)
  }

  public async getFile(fileId: string) {
    const existFile = await this.fileRepository.findById(fileId);

    if (!existFile) {
      throw new NotFoundException(`File with ${fileId} not found.`);
    }

    return existFile;
  }
}
