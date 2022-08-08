# Docker 挂载开发

```sh
# 当前目录下
docker run -it -v $PWD:/workspace -w /workspace docker_image_name

# 非当前目录场景，$PWD 替换为 path_local_dir
```
