## git lint

```sh
branch="$(git rev-parse --abbrev-ref HEAD)"

if [ "$branch" = "master" ]; then
    echo "不允许直接提交代码到 master。" 
    exit 1
fi

npm run tsccheck

if [ "$?" == 0 ]; then
    echo "tsc check 通过。"
else
    exit 1
fi

npm run lint

if [ "$?" == 0 ]; then
    echo "lint 通过。"
else
    exit 1
fi
```