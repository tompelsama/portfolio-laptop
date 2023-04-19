import { ContactShadows, Environment, Float, Html, PerspectiveCamera, PresentationControls, Text } from '@react-three/drei'
import Macbook from './Macbook'
import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useFrame } from '@react-three/fiber'

export default function Experience()
{
    const [clickState, setClickState] = useState(false)
    const screen = useRef()
    const laptop = useRef()
    const website = useRef()
    const screenLight = useRef()
    const text = useRef()

    const openLaptop = (e) => {

        // avoid multiple click
        if(clickState)
            return

        gsap.to(e.camera.position, {
            x: -0.01,
            ease: "power1.inOut",
            duration: 3
        })

        gsap.to(e.camera.rotation, {
            y: 0.01,
            z: 0.01,
            ease: "power1.inOut",
            duration: 3
        })

        gsap.to(screen.current.rotation, {
            x: 1.35,
            ease: "power1.inOut",
            duration: 2,
            onComplete: () => {
                website.current.children[0].style.opacity = 1

                gsap.to(screenLight.current, {
                    intensity: 64,
                    ease: "power1.inOut",
                    duration: 0.7,
                })

                console.log(e.camera)
            }
        });

        setClickState(true)
    }

    const onPointerEnter = () => {
        if(!clickState)
            document.body.style.cursor = 'pointer'
    }

    useFrame((state, delta) => {
        const deviceWidth = state.size.width
        
        laptop.current.scale.x = 1
        laptop.current.scale.y = 1
        laptop.current.scale.z = 1
        text.current.position.x = 1.8, 
        text.current.position.y = 0.75
        text.current.rotation.y = -1.25
        text.current.scale.x = 1
        text.current.scale.y = 1
        text.current.scale.z = 1

        if(deviceWidth < 600)
        {
            laptop.current.scale.x = 0.65
            laptop.current.scale.y = 0.65
            laptop.current.scale.z = 0.65
            text.current.position.x = -0.1
            text.current.position.y = 1.25
            text.current.rotation.y = 0
            text.current.scale.x = 0.4
            text.current.scale.y = 0.4
            text.current.scale.z = 0.4
        }
            
    })

    return <>

        <Environment preset="city" />

        <color args={ [ '#241a1a' ] } attach="background" />

        {/* <PresentationControls
            global
            rotation={ [ 0.13, 0.1, 0 ] }
            polar={ [ - 0.4, 0.2 ] }
            azimuth={ [ - 1, 0.75 ] }
            config={ { mass: 2, tension: 400 } }
            snap={ { mass: 4, tension: 400 } }
        > */}
        <PerspectiveCamera>
            <Float rotationIntensity={ 0.4 }>
                <Macbook 
                    ref={screen}
                    laptopRef={laptop}
                    position={ [0, - 1.2, 0] }
                    onClick={openLaptop}
                    onPointerEnter={ onPointerEnter }
                    onPointerLeave={ () => { document.body.style.cursor = 'default' } }
                >
                    {/* Screen light */}
                    <rectAreaLight
                        ref={screenLight}
                        width={ 2.5 }
                        height={ 1.65 }
                        intensity={ 0 }
                        color={ '#ffffff' }
                        rotation={ [ - 0.1, Math.PI, 0 ] }
                        position={ [ 0.02, 0.55, - 1.15 ] }
                    />
                    {/* iframe monitor */}
                    <Html
                        ref={website}
                        transform
                        wrapperClass="htmlScreen"
                        distanceFactor={ 1.16 }
                        position={ [ 0, 1.50, - 1.4 ] }
                        rotation-x={ - 0.23 }
                    >
                        <iframe src="https://tommysaputra.com" />
                    </Html>
                </Macbook>

                <Text 
                    ref={text}
                    font="./PermanentMarker-Regular.woff"
                    fontSize={ 0.6 }
                    position={ [ 1.8, 0.75, 0.75 ] }
                    rotation-y={ - 1.25 }
                    maxWidth={ 2 }
                    textAlign='center'
                >Tommy Saputra</Text>
            </Float>
            </PerspectiveCamera>
        {/* </PresentationControls> */}

        <ContactShadows 
            position-y={ - 1.4 } 
            opacity={ 0.4 }
            scale={ 5 }
            blur={ 2.4 }
        />

    </>
}