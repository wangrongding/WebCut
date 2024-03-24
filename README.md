# WebCut

本项目将使用纯 Web 技术构建音视频编辑工具。  

在此之前，前端开发会在有限的场景使用 ffmpeg.wasm。
Chrome 94 开放了 WebCodecs API， 该 api 提供对浏览器中已有编解码器的访问。它可以访问原始视频帧，音频数据块，图像解码器，音频和视频编码器和解码器。这意味着 JS 也可以处理音视频了，并且你不再需要增加带宽以下载浏览器中已有的编解码器。  
且经过简单的测试发现 WebCodecs 性能比 ffmpeg.wasm 好非常多。 


该项目目前正在开发中（Stay tuned）...  
线上地址（address）： [webcut.cn](https://webcut.cn)

🌸 开源不易，star 鼓励 ⭐️
