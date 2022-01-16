
export enum FileType {
    IMAGE = 'image',
    VIDEO = 'video',
    AUDIO = 'audio',
    ARCHIVE = 'archive',
    LINK = 'link',
}

export enum FileExtension {
    PDF = 'pdf',
    DOC = 'doc',
    DOCX = 'docx',
    XLS = 'xls',
    XLSX = 'xlsx',
}

type FileReturn = {
    name: string
    orginal_name: string
    path: string
    type: string
}

export class FileHelper {
    static EXT_IMAGE = "bmp,dib,gif,ico,jpe,jpeg,jpg,pjpeg,png,jfif";
    /**
     * Valid audio's extensions
     */
    static EXT_AUDIO = "3ga,amr,mp3,m4a,wav,wma";
    /**
     * Valid video's extensions
     */
    // const EXT_VIDEO = "avi,3g2,3gp,flv,m4v,mp4,mpg,mov,rmvb,mkv,wmv,vob";
    static EXT_VIDEO = "avi,3gpm4v,mp4,mpg,mov,mkv,wmv";

    static getExtension(filename: string, lowercase: boolean = true): string | undefined {
        if (filename.indexOf('.') > 0) {
            filename = filename.split('.')[filename.split('.').length - 1]
            return lowercase ? filename.toLowerCase() : filename
        }
    }

    static getName(filename: string) {
        const file = this.getNameWithExtension(filename)
        if (file.indexOf('.') > 0) {
            return file.split('.')[0]
        }
        return file
    }

    static getNameWithExtension(filename: string) {
        if (filename.indexOf('/') > 0) {
            return filename.split('/')[filename.split('/').length - 1]
        }
        return filename
    }

    static getType(filename: string): string | undefined {
        if (this.isImage(filename)) {
            return FileType.IMAGE
        }
        if (this.isAudio(filename)) {
            return FileType.AUDIO
        }
        if (this.isVideo(filename)) {
            return FileType.VIDEO
        }
        if (this.isLink(filename)) {
            return FileType.LINK
        }
        if (this.isArchive(filename)) {
            return FileType.ARCHIVE
        }
    }

    static isImage(filename: string): boolean {
        const extension = this.getExtension(filename)
        return this.EXT_IMAGE.split(',').find(ext => ext == extension) ? true : false
    }

    static isAudio(filename: string): boolean {
        const extension = this.getExtension(filename)
        return this.EXT_AUDIO.split(',').find(ext => ext == extension) ? true : false
    }

    static isVideo(filename: string): boolean {
        const extension = this.getExtension(filename)
        return this.EXT_VIDEO.split(',').find(ext => ext == extension) ? true : false
    }

    static isLink(filename: string): boolean {
        const ext = this.getExtension(filename)
        return !ext

    }

    static isArchive(filename: string): boolean {
        const ext = this.getExtension(filename)
        return ext != '' && ext != 'undefined'
            && !this.isImage(filename) && !this.isAudio(filename) && !this.isVideo(filename)
    }

    static convertToBlobURL(file: File) {
        return URL.createObjectURL(file)
    }

    static convertToBasecode(file: File) {
        return URL.createObjectURL(file)
    }
}
