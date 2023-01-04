import { Controller, HttpCode, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { FileResponse } from './file.interface'
import { FileService } from './file.service'
import { MFile } from './types/mfile.class'

@Controller('files')
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Auth()
    @HttpCode(200)
    @UseInterceptors(FileInterceptor('file'))
    @Post('upload')
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Query('folder') folder?: string
    ): Promise<FileResponse[]> {
        const saveArray: MFile[] = [new MFile(file)];
        if (file.mimetype.includes('image')) {
            const buffer = await this.fileService.convertToWebp(file.buffer)
            saveArray.push(
                new MFile({
                    originalname: `${file.originalname.split('.')[0]}.webp`,
                    buffer,
                }),
            )
        }
        return this.fileService.saveFiles(saveArray, folder)
    }
}
