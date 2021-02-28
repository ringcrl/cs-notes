// 根据版本，统一 texture2D 和 texture 为 TEXTURE2D

#if __VERSION__ < 130
#define TEXTURE2D texture2D
#else
#define TEXTURE2D texture
#endif
