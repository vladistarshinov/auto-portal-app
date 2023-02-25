import { Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import { FileResponse } from './response/file.response'
import * as sharp from 'sharp'
import { MFile } from './types/mfile.class'

@Injectable()
export class FileService {
    public async saveFiles(files: MFile[], folder: string = 'default'): Promise<FileResponse[]> {
        const uploadFolder = `${path}/uploads/${folder}`
        await ensureDir(uploadFolder)
        const res: FileResponse[] = await Promise.all(
            files.map(async file => {
                await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
                return {
                    url: `/uploads/${folder}/${file.originalname}`,
                    name: file.originalname,
                };
            })
        )
        return res
    }

    public convertToWebp(file: Buffer): Promise<Buffer> {
        return sharp(file).webp().toBuffer()
    }
}
