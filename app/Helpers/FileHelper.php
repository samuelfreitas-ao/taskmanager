<?php

namespace App\Helpers;

use App\Models\File;
use App\Types\FileType;
use Illuminate\Support\Facades\Storage;
use illuminate\Support\Str;

class FileHelper
{
  const EXT_IMAGE = 'gif,ico,jpe,jpeg,jpg,pjpeg,png,jfif',
    EXT_AUDIO = '3ga,amr,mp3,m4a,wav,wma',
    EXT_VIDEO = "avi,3gpm4v,mp4,mpg,mov,mkv,wmv";

  const TYPE_AUDIO = 'audio',
    TYPE_ARCHIVE = 'archive',
    TYPE_IMAGE = 'image',
    TYPE_VIDEO = 'video';

  public static function upload(FileType $data)
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

  public static function removeUpload(string | array $file)
  {
    if (is_array($file)) {
      foreach ($file as  $f) {
        Storage::delete($f);
      }
    } else {
      Storage::delete($file);
    }
  }

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

  public static function getExtension(string $file): string
  {
    $explode =  explode('.', $file);
    $length = count($explode);
    if ($length > 1) {
      return Str::lower($explode[$length - 1]);
    }
    return null;
  }

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
