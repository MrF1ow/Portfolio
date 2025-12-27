![ProjectImage](./site.png)

# The Whole Me

## Reason 💭
You might be wondering: why does this website have *two* versions of the same person? Well, something I noticed while browsing countless portfolio pages for inspiration was that they all focused on just one aspect of themselves: who they are as a software professional. Don’t get me wrong, that’s very important, but companies and people looking to hire are evaluating both the software side and the person side. And that’s how this idea was born.

## The Tech Stack 🛢️
- [**Vite**](https://vite.dev/) 
- [**Tailwind CSS**](https://tailwindcss.com/docs/installation/using-vite)
- [**DaisyUI**](https://daisyui.com/docs/install/)

## How to customize it for yourself 🖌️

If you’d like to fork this repo and customize it for yourself, go ahead! Here are some tips on the architecture and functionality of the project to help you get started:

1. **Data Storage**  
   All data for the webpage is stored in `/src/utils/data`. No data is hard-coded.  

2. **Images**  
   Images are fetched using utility functions located in `/src/utils/images`.  

3. **Data Types**  
   Definitions for data types are in `/src/types`. Reviewing these is highly recommended.  

4. **React Context**  
   The context for switching between the two profiles is stored in `/src/context/`.  

5. **Lottie Animations**  
   Lottie files are used for animations. Learn more [here](https://lottiefiles.com/blog/working-with-lottie-animations/how-to-use-lottie-in-react-app).  

6. **Framer Motion**  
   Animations are handled using Framer Motion. Learn more [here](https://medium.com/@sanksiddharth/animating-your-web-pages-a-beginners-guide-with-framer-motion-5de404cd25df).  

7. **Theming**  
   To change the application’s theme, use the [DaisyUI Theme Generator](https://daisyui.com/theme-generator).

8. **EmailJS**  
   EmailJS is used for sending emails directly from the frontend. Make sure to configure your environment variables (prefixed with `VITE_` in Vite) and use the EmailJS service, template, and public key to enable email functionality.




