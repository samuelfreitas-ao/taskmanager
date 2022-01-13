<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use illuminate\Support\Str;

class FileController extends Controller
{
    const EXT_IMAGE = 'gif,ico,jpe,jpeg,jpg,pjpeg,png,jfif',
        EXT_AUDIO = '3ga,amr,mp3,m4a,wav,wma',
        EXT_VIDEO = "avi,3gpm4v,mp4,mpg,mov,mkv,wmv";

    const TYPE_AUDIO = 'audio',
        TYPE_ARCHIVE = 'archive',
        TYPE_IMAGE = 'image',
        TYPE_VIDEO = 'video';

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\File  $file
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $feedback = ["result" => false, "message" => "", "data" => null];
        $file = File::find($id);
        if (!$file) {
            $feedback["message"] = "O ficheiro que tentou excluir não existe.";
        } else {
            $fileName = $file->path;
            try {
                $file->delete();
                self::removeUpload($fileName);
                $feedback["result"] = true;
                $feedback["message"] = "Ficheiro {$fileName} excluído com sucesso.";
            } catch (\Exception $ex) {
                $feedback["message"] = "Erro ao excluir o ficheiro {$fileName}";
            }
        }
        return response()->json($feedback);
    }

    /**
     * Upload and store file in database
     *
     * @param object $data
     * @return object Return a json response
     */
    public static function upload($data)
    {
        $feeback = ['result' => false, 'message' => '', 'data' => null];
        $file = $data->file;
        $task_id = $data->task_id;

        if (is_array($file)) {
            foreach ($file as $f) {
                $feeback = self::_uploadAndSave($f, $task_id)->getData();
            }
        } else {
            $feeback = self::_uploadAndSave($file, $task_id)->getData();
        }
        return response()->json($feeback);
    }

    public static function removeUpload($file)
    {
        if (is_array($file)) {
            foreach ($file as  $f) {
                if (is_object($f)) {
                    Storage::delete($f->path);
                } else {
                    Storage::delete($f);
                }
            }
        } else if (is_object($file)) {
            Storage::delete($file->path);
        } else {
            Storage::delete($file);
        }
    }

    /**
     * Upload e store data file in database
     *
     * @param mix $file array | object
     * @param int $task_id
     * @return object Return an uploaded file path
     */
    private static function _uploadAndSave($file, $task_id): object
    {
        $feeback = ['result' => false, 'message' => '', 'data' => null];
        $fileOriginalName =  $file->getClientOriginalName();
        $fileName = self::changeNameIfExists($fileOriginalName);
        $type = self::getType($fileOriginalName);
        $path = $file->storeAs($type, $fileName);

        $_file = new File();
        $_file->path = $path;
        $_file->type = $type;
        $_file->task_id = $task_id;
        try {
            $_file->save();
            $feeback['result'] = true;
            $feeback['message'] = 'Ficheiro inserido com sucesso.';
            $feeback['data'] = $_file;
        } catch (\Throwable $th) {
            $feeback['message'] = 'Houve um erro ao salvar ficheiro.';
        }
        return response()->json($feeback);
    }

    /**
     * Change a file name if it already exists in some folder
     *
     * @param string $file
     * @return string Return a unique file name in a folder
     */
    public static function changeNameIfExists($file): string
    {
        $path = Storage::path('');
        $type = self::getType($file);
        $onlyName = Str::limit($file, 50);
        $onlyName = Str::slug(self::getNameOnly($file));
        $fileExt = self::getExtension($file);
        if (file_exists($path . $type . '/' . $onlyName . '.' . $fileExt)) {
            $i = 1;
            while (file_Exists($path . $type . '/' . $onlyName . '-' . $i . '.' . $fileExt)) {
                $i++;
            }
            $file = Str::slug($onlyName) . '-' . $i . '.' . $fileExt;
        } else {
            $file = Str::slug($onlyName) . '.' . $fileExt;
        }
        return $file;
    }

    /**
     * Extract a file extension
     *
     * @param string $file
     * @return string Return file extension
     */
    public static function getExtension(string $file): string
    {
        $explode =  explode('.', $file);
        $length = count($explode);
        if ($length > 1) {
            return Str::lower($explode[$length - 1]);
        }
        return null;
    }

    /**
     * Extract a file name without extension
     *
     * @param string $file
     * @return string Return file name without extension
     */
    public static function getNameOnly(string $file): string
    {
        $file = basename($file);
        $explode =  explode('.', $file);
        $length = count($explode);
        if ($length > 1) {
            return substr($file, 0, strripos($file, '.' . self::getExtension($file)));
        }
        return null;
    }


    /**
     * Get a file type, such as: image | audio | video | archive
     *
     * @param string $file
     * @return string Return a file type
     */
    public static function getType(string $file): string
    {
        $extension = self::getExtension($file);
        if ($extension) {
            if (in_array($extension, explode(',', self::EXT_IMAGE))) {
                return self::TYPE_IMAGE;
            } else if (in_array($extension, explode(',', self::EXT_AUDIO))) {
                return self::TYPE_AUDIO;
            } else if (in_array($extension, explode(',', self::EXT_VIDEO))) {
                return self::TYPE_VIDEO;
            } else {
                return self::TYPE_ARCHIVE;
            }
        }
        return null;
    }


    public static function uploadPath($file = null)
    {
        return Storage::path('') . ($file ?? '');
    }

    public static function uploadLink($file = null)
    {
        return url('/storage') . ($file ? '/' . $file : '');
    }
}
