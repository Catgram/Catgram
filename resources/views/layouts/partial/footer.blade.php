@if(config('instance.restricted.enabled') == false)
  <footer>
    <div class="container py-5">
        <p class="text-center text-uppercase font-weight-bold small text-justify">
          <a href="https://catgram.co/discover" class="text-dark p-2">Explore</a>
          <a href="https://catgram.co/discover/tags/cat?src=hash" class="text-dark p-2">#Cat</a>
          <a href="{{route('site.about')}}" class="text-dark p-2">{{__('site.about')}}</a>
          <a href="{{route('site.help')}}" class="text-dark p-2">{{__('site.help')}}</a>
          <a href="{{route('site.terms')}}" class="text-dark p-2">{{__('site.terms')}}</a>
          <a href="{{route('site.privacy')}}" class="text-dark p-2">{{__('site.privacy')}}</a>
          <a href="{{route('site.language')}}" class="text-dark p-2">{{__('site.language')}}</a>
          <a href="https://ko-fi.com/Catgram" target="_blank" class="text-dark p-2">Donate</a>
        </p>
        <p class="text-center text-muted small mb-0">
          <span class="text-muted">© {{date('Y')}}. <a href="https://github.com/catgram/catgram" target="_blank" class="text-muted font-weight-bold" rel="noopener">Catgram</a></span>
          <span class="mx-2">·</span>
          <a href="https://pixelfed.org" target="_blank" rel="noopener">Pixelfed</a> v{{config('pixelfed.version')}}
        </p>
    </div>
  </footer>
  @endif
