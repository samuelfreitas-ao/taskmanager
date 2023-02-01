<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="logo" content="{{url('/assets/img/logo.png')}}">
  <meta name="logo_vertical" content="{{url('/assets/img/logo-vertical.png')}}">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title class="title">Task Manager</title>
  <link rel="stylesheet" href="css/app.css">
  <meta name="base_url" content="{{ url('') }}">
  <meta name="csrf-token" content="{{ csrf_token() }}">
</head>

<body>
  <div class="" id="app"></div>
</body>


<script defer src="{{url(mix('js/manifest.js'))}}"></script>
<script defer src="{{url(mix('js/vendor.js'))}}"></script>
<script defer src="{{url(mix('js/app.js'))}}"></script>

</html>