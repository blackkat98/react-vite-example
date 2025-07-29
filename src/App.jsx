import { motion, useTransform, useMotionValue, useMotionValueEvent } from 'framer-motion'
import { useState, useRef, useCallback, useEffect, useLayoutEffect, useMemo } from 'react'

import pineTreesImg from '@/assets/image/pine-trees.png'
import sunImg from '@/assets/image/sun.png'
import moonImg from '@/assets/image/moon.png'
import projectFolderImg from '@/assets/image/project-folder.png'
import useHookImg from '@/assets/image/use-hooks.png'
import useHook2Img from '@/assets/image/use-hooks-2.png'
import jsxImg from '@/assets/image/jsx.png'
import '@/assets/css/App.css'

function App() {
    const bottomTextLight = 'It is morning. You are at the top of the page. Scroll down!'
    const bottomTextDark = 'It is night. You are at the bottom of the page. Scroll up!'
    const [ bottomText, setBottomText ] = useState('')
    const [ showBottomText, setShowBottomText ] = useState(false)
    const scrollRef = useRef(null)
    const scrollYProgress = useMotionValue(0)
    const handleScroll = useCallback(() => {
        const container = scrollRef.current
        const scrollTop = container.scrollTop
        const scrollHeight = container.scrollHeight - container.clientHeight
        const progress = scrollTop / scrollHeight
        scrollYProgress.set(progress)
    }, [scrollYProgress])
    const bgColor = useTransform(
        scrollYProgress,
        [ 0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 1 ],
        [ '#fde68a', '#93c5fd', '#60a5fa', '#3b82f6', '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9' ]
    )
    const shades = useTransform(
        scrollYProgress,
        [ 0, 1 ],
        [ 'brightness(1) saturate(1)', 'brightness(0.3) saturate(0.3)' ]
    )
    const settingSun = useTransform(
        scrollYProgress,
        [ 0, 1 ],
        [ '0%', '100%' ]
    )
    const risingMoon = useTransform(
        scrollYProgress,
        [ 0, 1 ],
        [ '100%', '0%' ]
    )
    useEffect(() => {
        const container = scrollRef.current
        container.addEventListener('scroll', handleScroll)
        handleScroll()

        return () => container.removeEventListener('scroll', handleScroll)
    }, [ handleScroll ])
    useLayoutEffect(() => {
        const container = scrollRef.current
        container.scrollTop = 0

        if (container.scrollTop <= 0.01) {
            setShowBottomText(true)
            setBottomText(bottomTextLight)
        }
    }, [])
    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        setShowBottomText(latest >= 0.99 || latest <= 0.01)

        if (latest <= 0.01) setBottomText(bottomTextLight)
        else if (latest >= 0.99) setBottomText(bottomTextDark)
    })
    const sections = useMemo(() => [
        {
            title: 'Hi there, I am Nam, a backend and frontend programmer',
            content: `
                As a VueJS enjoyer, I find the idea of ReactJS absurb.
                ReactJS is popular and I admit that it can do some good.
                However, ReactJS code looks all over the place.
                But here it is. This demo is built upon ReactJS and Vite.
                As they say, you have to understand it to hate it.
                And I cannot wait to express how much I dislike the thing.
            `,
            image: projectFolderImg,
        },
        {
            title: 'All the "use-" hooks - A pain in the neck',
            content: `
                They look a little like VueJS 3 Composition API Lifecycle Hooks.
                But why is it that their names are so misleading. I personally hate "useCallback".
                I understand the concept of "useMemo". It is a little like VueJS computed values.
                But doesn't the "Memo" part make people think that it won't change?
                And I haven't mention that some of them do the same thing with slight differences.
                Wow.
            `,
            image: useHookImg,
        },
        {
            title: 'JSX itself - Blurs Logic and Markup',
            content: `
                Don't get me wrong. The genius of mixing JS/TS with HTML is undeniable.
                What do they say again? Ah, to make everything a function or class that return a component.
                Believe me. Thanks God that VueJS has v-if/v-else for conditional rendering.
                You litterally have to add ternary operators or logical expressions for that in ReactJS.
                It looks super cluttered and is hard to read.
                Look how well VueJS handle that, by separating the script from the DOM templates!
            `,
            image: jsxImg,
        },
        {
            title: 'Oh it is re-rendering! - But, who asked?',
            content: `
                Yes. The whole point of using ReactJS is that you control the flow of re-rendering.
                Or at least make it smooth and cause minor effects.
                Because this thing re-renders even when you don't expect it to!
                Optimization is a problem in every frontend project as things scale up.
                But unlike VueJS, ReactJS doesn't handle reactivity efficiency on its own.
            `,
        },
        {
            title: 'Um, I have used or read it before. - What is it?',
            content: `
                With all those problems and a ton of others, ReactJS is not beginner-friendly at all.
                And it might be hostile to developers at higher levels too.
                The learning curve is crazy.
                You have just integrated from a VanillaJS and HTML code base?
                Congratulation, this is hell for juniors like you!
                Some simple things look complex from the start. So good luck upgrading the feature!
            `,
            image: useHook2Img,
        },
        {
            title: 'Conclusion - Or whatever it is',
            content: `
                As a developer in general, I admire the good things that ReactJS brings.
                Its initial projects are always small, giving space for creativity.
                It is a bunch of functions and classes, may backend-first developers may love it.
                It has so many libraries, so even though opinions are rare, options are a lot.
                It has a large community of supporters, like a cult (those who are not like me obviously).
                And many more.

                But, to me in person, it is just a library that provides too little.
                Yes, ReactJS is a library, whereas VueJS is a framework.
                So, VueJS must be more sophisticated.
                VueJS initial projects provide even Vue-Router and Pinia (if I am not wrong).
                VueJS structure is clear and well-defined, with the HTML-parts and the script-parts are separated.
                A VueJS component can be either a Vue File Component or a function that render it.
                VueJS has a lot of libraries that are plug-and-play.
                VueJS also has a large set of users and supporters.

                But hey, my opinion is not a philosophy of any kind.
                To you, the only thing that matter is what you choose to build.
            `,
        },
    ], [])

    return (
        <div
            ref={scrollRef}
            className="relative w-full h-screen overflow-y-scroll overflow-x-hidden"
        >
            {/* Fixed pine tree background */}
            <div className='fixed bottom-0 right-6 z-[110] text-xs'>
                <a
                    className='text-yellow-100'
                    href='https://github.com/blackkat98/react-vite-example'
                    target='_blank'
                >
                    https://github.com/blackkat98/react-vite-example
                </a>
            </div>
            <motion.div
                className="fixed bottom-0 left-0 w-[calc(100vw-8px)] h-screen bg-no-repeat bg-bottom bg-cover z-[100] pointer-events-none flex justify-center items-end"
                style={{ backgroundImage: `url(${pineTreesImg})`, filter: shades }}
            >
                {showBottomText && <p className='text-white brightness-150 saturate-150'>
                    {bottomText}
                </p>}
            </motion.div>

            <motion.div
                className='fixed left-[22%] z-[5] w-40 h-40'
                style={{ top: settingSun }}
            >
                <img src={sunImg} />
            </motion.div>

            <motion.div
                className='fixed right-[22%] z-[5] w-40 h-40'
                style={{ top: risingMoon }}
            >
                <img src={moonImg} />
            </motion.div>

            {/* Scrollable content */}
            <div className="relative z-10 w-full">
                {sections.map((item, index) => (
                    <section
                        key={index}
                        className="h-screen py-4 space-y-4"
                    >
                        <h2 className="text-3xl text-gray-900 text-center drop-shadow">
                            {item.title}
                        </h2>
                        <div className='mx-auto w-[33%] text-gray-900 text-center drop-shadow whitespace-pre-line'>
                            {item.content}
                        </div>
                        {item.image && <img
                            className='mx-auto w-[28%]'
                            src={item.image}
                        />}
                    </section>
                ))}
            </div>

            {/* Color-changing box */}
            <motion.div
                style={{ backgroundColor: bgColor }}
                className="fixed top-0 left-0 w-[calc(100vw-8px)] h-full shadow-lg z-0 pointer-events-none"
            >
            </motion.div>
        </div>
    )
}

export default App
