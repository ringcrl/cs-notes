from stable_diffusion_tf.stable_diffusion import StableDiffusion
from PIL import Image

generator = StableDiffusion(
    img_height=512,
    img_width=512,
    jit_compile=False,
)
img = generator.generate(
    "An astronaut riding a horse",
    num_steps=50,
    unconditional_guidance_scale=7.5,
    temperature=1,
    batch_size=1,
)

# for image to image :
# img = generator.generate(
#     "A Halloween bedroom",
#     num_steps=50,
#     unconditional_guidance_scale=7.5,
#     temperature=1,
#     batch_size=1,
#     input_image="/path/to/img.png"
# )


Image.fromarray(img[0]).save("output.png")
