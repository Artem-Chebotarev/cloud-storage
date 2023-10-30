import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    // To be able work within FilesService with table Files
    @InjectRepository(FileEntity)
    private repository: Repository<FileEntity>,
  ) {}

  findAll() {
    return this.repository.find();
  }
}
