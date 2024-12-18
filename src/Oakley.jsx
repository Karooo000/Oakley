import React, { useRef, useEffect, useLayoutEffect, useState,  } from "react";
import { useGLTF, PerspectiveCamera, useAnimations, useProgress } from "@react-three/drei";
import gsap from "gsap";
import { useThree, useFrame } from "@react-three/fiber";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

let filename = "https://glassescode.netlify.app/OakleyAnimV1.glb"


let isMobileSize = window.innerWidth < 991
let isTabletSize = 991 < window.innerWidth && window.innerWidth < 1280

//FOV based on screensize ( responsive )

 const fovOriginal = 22.895

 const scaleFactorDesktop = window.innerWidth / 1512
 let scaleCof = 1 - scaleFactorDesktop
 let fovInBetween = scaleCof * scaleCof * fovOriginal

 let fovNewClamp = fovOriginal + fovInBetween
 let fovNew = fovNewClamp > 25 ? 25 : fovNewClamp

 let fovNewTabletProof = isTabletSize ? 33 : fovNew




export default function Model(props) {
    const group = useRef()
    const mmm = useRef()
    const mm = useRef()
    const tlDesk = useRef()
    const tlMob = useRef()
    const wholeModel = useRef()

    const { progress } = useProgress();

    const { nodes, materials, animations, scene } = useGLTF(filename)
    const { actions } = useAnimations(animations, group)


  if(progress > 99){
    document.querySelector("html").style.position = "relative"
  }

    
    useEffect(()=>{
      setTimeout(() => {

        if(progress > 99){
          //console.log("anim starts")
      
          let moveMenu = gsap.fromTo
          ('.menu', 
            {yPercent: -120},
            {yPercent: 0, duration: 1 , ease: "power4.out", delay: isMobileSize ? 2 : 1.5},
        );
            
            let moveH1 = gsap.fromTo
            ('.h1', 
            {xPercent: -200},
            {xPercent: 0, duration: 1, ease: "power4.out", delay: 0.5},
        );

            let moveH2 = gsap.fromTo
            ('.h2', 
            {xPercent: 200},
            {xPercent: 0, duration: 1, ease: "power4.out", delay: 0.5},
        );

            let moveThe = gsap.fromTo
            ('.text-the', 
            {yPercent: 200, opacity: 0},
            {yPercent: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 1},
        );

            let moveLines = gsap.fromTo
            ('.hero-line', 
            {yPercent: -200},
            {yPercent: 0, duration: 0.75, ease: "power4.out", delay: 1},
        );

        //.text-the

        //.lines-contain
  
      
        
      
      
          }})
    }, [])
    
   


    useGSAP(() => {

        /* Scroll animation STARTS */
        let whichAnimLenghtDesk = 240;
        let whichDurationDesk = 10;
    
    
        const clipMob = actions.CameraMob;
        const clipDesktop = actions.CameraDesk;

        //console.log(actions.CameraDesk)
    
        //const animationDurationMob = clipMob._clip.duration;
        const animationDurationDesk = clipDesktop._clip.duration;
    
        //const frameMob = animationDurationMob / whichAnimLenghtMob;
        const frameDesk = animationDurationDesk / whichAnimLenghtDesk;

        // if it runs until the last frame, it will restart from frame 1, didn't find a solution for this yet.
        //const maxMob = animationDurationMob - frameMob;
        const maxDesk = animationDurationDesk - frameDesk;
    
        mmm.current = gsap.matchMedia();
    
        mmm.current.add("(min-width: 992px)", () => {
          
          clipDesktop.play();
          //console.log("desktop clip plays")
    
          const mixerDesk = clipDesktop.getMixer();
          const proxyDesk = {
            get time() {
              return mixerDesk.time;
            },
            set time(value) {
              clipDesktop.paused = false;
              mixerDesk.setTime(value);
              clipDesktop.paused = true;
            },
          };
    
          // for some reason must be set to 0 otherwise the clip will not be properly paused.
          proxyDesk.time = 0;
    
          tlDesk.current = gsap.timeline({
            ease: "none",
            //immediateRender: false,
            scrollTrigger: {
              trigger: "#section2",
              start: "top bottom",
              end: "bottom bottom",
              endTrigger: "#scroll-contain",
              scrub: 1,
              toggleActions: "restart restart reverse reverse",
            },
          });
          tlDesk.current.set(proxyDesk, { time: 0 });
    
          tlDesk.current.to(
            proxyDesk,
    
            {
              time: 4.9999,
              ease: "none",
              duration: whichDurationDesk,
            }
          );
 
        });
    
        
        mmm.current.add("(max-width: 991px)", () => {
          
          clipMob.play();
          //console.log("mob clip plays")
    
          const mixerMob = clipMob.getMixer();
          const proxyMob = {
            get time() {
              return mixerMob.time;
            },
            set time(value) {
              clipMob.paused = false;
              mixerMob.setTime(value);
              clipMob.paused = true;
             // clipDesktop.paused=true
            },
          };
    
          // for some reason must be set to 0 otherwise the clip will not be properly paused.
          proxyMob.time = 0;
    
          tlMob.current = gsap.timeline({
            ease: "none",
            //immediateRender: false,
            scrollTrigger: {
              trigger: "#section2",
              start: "top bottom",
              end: "bottom bottom",
              endTrigger: "#scroll-contain",
              scrub: 1,
              toggleActions: "restart restart reverse reverse",
            },
          });
          tlMob.current.set(proxyMob, { time: 0 });
    
          tlMob.current.to(
            proxyMob,
    
            {
              time: 4.9999,
              ease: "none",
              duration: whichDurationDesk,
            }
          );
    
          
        });

        /** All animations for all screens STARTS */

        /** Second Screen Intro STARTS */

        const tlSecondIntro = gsap.timeline({
          scrollTrigger: {
            trigger: "#section2",
            start: "top bottom",
            end: "bottom bottom",
            endTrigger: "#section2",
            scrub: true,
          }
        })
        tlSecondIntro.from(".h4.prizm", {
            yPercent: 1700,
            opacity: 0,
            ease: "expo",
            duration: 1,
          }, "sameTimeSecondScreen");
        tlSecondIntro.from(".h4.lenses", {
            yPercent: 1200,
            opacity: 0,
            ease: "expo",
            duration: 1,
          }, "sameTimeSecondScreen");
          tlSecondIntro.from(".h4.technology", {
            yPercent: 700,
            opacity: 0,
            ease: "expo",
            duration: 1,
          }, "sameTimeSecondScreen");
          tlSecondIntro.from("#textContainSecondScreen", {
            yPercent: 700,
            opacity: 0,
            ease: "expo",
            duration: 1,
          }, "sameTimeSecondScreen");
          tlSecondIntro.from(".mob-lenses-shadow", {
            yPercent: 700,
            opacity: 0,
            ease: "expo",
            duration: 1,
          }, "sameTimeSecondScreen");

          
          /** Second Screen Intro FINISHES */

          /** Second Screen Outro STARTS */

          const tlSecondOutro = gsap.timeline({
            scrollTrigger: {
              trigger: "#section3",
              start: "top bottom",
              end: "bottom 50%",
              endTrigger: "#section3",
              scrub: true,
            }
          })
  
          tlSecondOutro.to(".h4.prizm", {
              yPercent: -25,
              ease: "expo",
              duration: 1,
            }, "sameTimeSecondScreenOutro");
            tlSecondOutro.to(".h4.lenses", {
              yPercent: -50,
              ease: "expo",
              duration: 1,
            }, "sameTimeSecondScreenOutro");
            tlSecondOutro.to(".h4.technology", {
              yPercent: -75,
              ease: "expo",
              duration: 1,
            }, "sameTimeSecondScreenOutro");
            tlSecondOutro.to("#line-secondScreen", {
              yPercent: -25,
              ease: "expo",
              duration: 1,
            }, "sameTimeSecondScreenOutro");
            tlSecondOutro.to("#textContainSecondScreen", {
              yPercent: isMobileSize ? -20 : -40,
              ease: "expo",
              duration: 1,
            }, "sameTimeSecondScreenOutro");
            tlSecondOutro.to(".mob-lenses-shadow", {
              yPercent: 250,
              scale: 1.7,
              opacity: 0,
              ease: "expo",
              duration: 1,
            }, "sameTimeSecondScreenOutro");
  

          /** Second Screen Outro FINISHES */

          /** Third Screen Intro STARTS */

          const tlThirdIntro = gsap.timeline({
            scrollTrigger: {
              trigger: "#section3",
              start: "top bottom",
              end: "bottom bottom",
              endTrigger: "#section3",
              scrub: true,
            }
          })
  
            tlThirdIntro.from(".h4.noslip", {
              yPercent: 1000,
              opacity: 0,
              ease: "expo",
              duration: 1,
            }, "sameTimeThirdScreen");
            tlThirdIntro.from(".h4.grip", {
              yPercent: 200,
              opacity: 0,
              ease: "expo",
              duration: 1,
            }, "sameTimeThirdScreen");
            tlThirdIntro.from(".h4.unobtainium", {
              yPercent: 700,
              opacity: 0,
              ease: "expo",
              duration: 1,
            }, "sameTimeThirdScreen");
            //thirdScreenLine
            tlThirdIntro.from("#thirdScreenLine", {
              xPercent: -1220,
              //opacity: 0,
              ease: "expo",
              duration: 1,
            }, "sameTimeThirdScreen");
            tlThirdIntro.from("#textThirdScreen", {
              yPercent: 1500,
              opacity: 0,
              ease: "expo",
              duration: 1,
            }, "sameTimeThirdScreen");


          /** Third Screen Intro FINISHES */

          /** Third Screen Outro STARTS */

          const tlThirdOutro = gsap.timeline({
            scrollTrigger: {
              trigger: "#section4",
              start: "top bottom",
              end: "bottom 50%",
              endTrigger: "#section4",
              scrub: true,
            }
          })
  
            tlThirdOutro.to(".h4.noslip", {
              yPercent: -10,
              //opacity: 0,
              ease: "expo",
              duration: 1,
            }, "sameTimeThirdScreenOutro");
            tlThirdOutro.to(".h4.grip", {
              yPercent: isMobileSize ? -40 : -100,
              //opacity: 0,
              ease: "expo",
              duration: 1,
            }, "sameTimeThirdScreenOutro");
            tlThirdOutro.to(".h4.unobtainium", {
              yPercent: isMobileSize ? -70 : -25,
              //opacity: 0,
              ease: "expo",
              duration: 1,
            }, "sameTimeThirdScreenOutro");
            //thirdScreenLine
            tlThirdOutro.to("#thirdScreenLine", {
              xPercent: -200,
              opacity: 0,
              ease: "expo",
              duration: 1,
            }, "sameTimeThirdScreenOutro");
            tlThirdOutro.to("#textThirdScreen", {
              yPercent: isMobileSize ? -30 : -130,
              //opacity: 0,
              ease: "expo",
              duration: 1,
            }, "sameTimeThirdScreenOutro");

          /** Third Screen Outro FINISHES */

          /** Fourth Screen Intro STARTS */
          const tlFourthIntro = gsap.timeline({
            scrollTrigger: {
              trigger: "#section4",
              start: "top bottom",
              end: "bottom bottom",
              endTrigger: "#section4",
              scrub: true,
            }
          })
  
            tlFourthIntro.from(".h4.oneeighty", {
              yPercent: 200,
              opacity: 0,
              ease: "expo",
              duration: 1,
            }, "sameTimeFourthScreen");
            tlFourthIntro.from(".h4.degree", {
              yPercent: 1200,
              opacity: 0,
              ease: "expo",
              duration: 1,
            }, "sameTimeFourthScreen");
            tlFourthIntro.from(".h4.coverage", {
              yPercent: 3700,
              opacity: 0,
              ease: "expo",
              duration: 1,
            }, "sameTimeFourthScreen");
            tlFourthIntro.from("#textBoxFourth", {
              yPercent: 1200,
              opacity: 0,
              ease: "expo",
              duration: 1,
            }, "sameTimeFourthScreen");
            tlFourthIntro.from("#coverageShadow", {
              yPercent: -100,
              rotationZ: -90,
              xPercent: 1500,
              opacity: 0,
              ease: "expo",
              duration: 1,
            }, "sameTimeFourthScreen");
          /** Fourth Screen Intro FINISHES */

          /** Fourth Screen Outro STARTS */

          const tlFourthOutro = gsap.timeline({
            scrollTrigger: {
              trigger: "#section5",
              start: "top bottom",
              end: "bottom 50%",
              endTrigger: "#section5",
              scrub: true,
            }
          })
  
            tlFourthOutro.to(".h4.oneeighty", {
              yPercent: -20,
              ease: "expo",
              duration: 1,
            }, "sameTimeFourthScreenOutro");
            tlFourthOutro.to(".h4.degree", {
              yPercent: -50,
              ease: "expo",
              duration: 1,
            }, "sameTimeFourthScreenOutro");
            tlFourthOutro.to(".h4.coverage", {
              yPercent: -80,
              ease: "expo",
              duration: 1,
            }, "sameTimeFourthScreenOutro");
            tlFourthOutro.to("#textBoxFourth", {
              yPercent: -30,
              ease: "expo",
              duration: 1,
            }, "sameTimeFourthScreenOutro");
            
            tlFourthOutro.to("#coverageShadow", {
              yPercent: isMobileSize ? 120 : 80,
              scale: 1.2,
              opacity: 0,
              ease: "expo",
              duration: 1,
            }, "sameTimeFourthScreenOutro");
            

            /** Fourth Screen Outro FINISHES */

            /** Fifth Screen Intro STARTS */
            const tlFifthIntro = gsap.timeline({
              scrollTrigger: {
                trigger: "#section5",
                start: "top bottom",
                end: "bottom bottom",
                endTrigger: "#section5",
                scrub: true,
              }
            })
    
              tlFifthIntro.from(".h4.optimized", {
                yPercent: 500,
                opacity: 0,
                ease: "expo",
                duration: 1,
              }, "sameTimeFifthScreen");
              tlFifthIntro.from(".h4.for", {
                yPercent: 50,
                opacity: 0,
                ease: "expo",
                duration: 1,
              }, "sameTimeFifthScreen");
              tlFifthIntro.from(".h4.fit", {
                yPercent: 600,
                opacity: 0,
                ease: "expo",
                duration: 1,
              }, "sameTimeFifthScreen");
              tlFifthIntro.from(".h4.helmets", {
                yPercent: 100,
                opacity: 0,
                ease: "expo",
                duration: 1,
              }, "sameTimeFifthScreen");
              tlFifthIntro.from("#textBoxFifth", {
                yPercent: 50,
                opacity: 0,
                ease: "expo",
                duration: 1,
              }, "sameTimeFifthScreen");
              tlFifthIntro.from(".helmet-shadow", {
                yPercent: -300,
                scale: 0.7,
                opacity: 0,
                ease: "expo",
                duration: 1,
              }, "sameTimeFifthScreen");
            /** Fifth Screen Intro FINISHES */

            /** Fifth  Screen Outro STARTS */
            const tlFifthOutro = gsap.timeline({
              scrollTrigger: {
                trigger: "#chooseStyless",
                start: "top bottom",
                end: "bottom 50%",
                endTrigger: "#chooseStyless",
                scrub: true,
              }
            })
  
              tlFifthOutro.to(".h4.optimized", {
                yPercent: -20,
                //opacity: 0,
                ease: "expo",
                duration: 1,
              }, "sameTimeFifthScreenOutro");
              tlFifthOutro.to(".h4.for", {
                yPercent: -50,
                //opacity: 0,
                ease: "expo",
                duration: 1,
              }, "sameTimeFifthScreenOutro");
              tlFifthOutro.to(".h4.fit", {
                yPercent: -40,
                //opacity: 0,
                ease: "expo",
                duration: 1,
              }, "sameTimeFifthScreenOutro");
              tlFifthOutro.to(".h4.helmets", {
                yPercent: -100,
                //opacity: 0,
                ease: "expo",
                duration: 1,
              }, "sameTimeFifthScreenOutro");
              tlFifthOutro.to("#textBoxFifth", {
                yPercent: -40,
                opacity: isMobileSize ? 0 : 1,
                ease: "expo",
                duration: 1,
              }, "sameTimeFifthScreenOutro");
            
            /** Fifth  Screen Outro FINISHES */


          

            /** FAQ intro STARTS */
            const tlFAQIntro = gsap.timeline({
              scrollTrigger: {
                trigger: "#faq",
                start: "top bottom",
                end: "bottom bottom",
                endTrigger: "#faq",
                scrub: 1,
              }
            })
    
              tlFAQIntro.from(".h4.frequently", {
                yPercent: 500,
                opacity: 0,
                ease: "expo",
                duration: 1,
              }, "sameTimeFAQ");
              tlFAQIntro.from(".h4.asked", {
                yPercent: 250,
                opacity: 0,
                ease: "expo",
                duration: 1,
              }, "sameTimeFAQ");
              tlFAQIntro.from(".h4.questions", {
                yPercent: 100,
                opacity: 0,
                ease: "expo",
                duration: 1,
              }, "sameTimeFAQ");
              tlFAQIntro.from(".faq-main-contain", {
                yPercent: 100,
                opacity: 0,
                ease: "expo",
                duration: 1,
              }, "sameTimeFAQ");
            /** FAQ intro FINISHES */

            /** FAQ outro STARTS */
            const tlFAQOutro = gsap.timeline({
              scrollTrigger: {
                trigger: "#pics",
                start: "top bottom",
                end: "bottom 50%",
                endTrigger: "#pics",
                scrub: true,
              }
            })

              tlFAQOutro.to(".h4.frequently", {
                yPercent: -50,
                //opacity: 0,
                ease: "expo",
                duration: 1,
              }, "sameTimeFAQOutro");
              tlFAQOutro.to(".h4.asked", {
                yPercent: -75,
                //opacity: 0,
                ease: "expo",
                duration: 1,
              }, "sameTimeFAQOutro");
              tlFAQOutro.to(".h4.questions", {
                yPercent: -110,
                //opacity: 0,
                ease: "expo",
                duration: 1,
              }, "sameTimeFAQOutro");
              tlFAQOutro.to(".faq-main-contain", {
                yPercent: -20,
                opacity: 0,
                ease: "expo",
                duration: 1,
              }, "sameTimeFAQOutro");
            /** FAQ outro FINISHES */
          

        /** All animations for all screens FINISHES */


        mm.current = gsap.matchMedia()
        mm.current.add("(min-width: 992px)", () => {

          // Hero Leave anim

          //gsap.set(".hero-shadow", { yPercent: 0, opacity: 1 });

          const tlHeroLeaveDesk = gsap.timeline({
            scrollTrigger: {
              trigger: "#section2",
              start: "top bottom",
              end: "bottom 50%",
              endTrigger: "#section2",
              scrub: true,
            }
          })

          tlHeroLeaveDesk.to(".hero-shadow", {
              yPercent: 300,
              opacity: 0,
              ease: "expo",
              duration: 0.5,
            }, "sameTimeDesk");
            tlHeroLeaveDesk.to(".h2", {
              yPercent: -25,
              ease: "expo",
              duration: 0.5,
            }, "sameTimeDesk");
            

            /** Config intro STARTS */
            //left-contain
            const tlConfigIntro = gsap.timeline({
              scrollTrigger: {
                trigger: "#chooseStyless",
                start: isMobileSize ? "top top" : "top bottom",
                end: isMobileSize ? "top 70%" : "bottom bottom",
                endTrigger: "#chooseStyless",
                scrub: 1,
                
              }
            })
    
              tlConfigIntro.from(".left-contain", {
                xPercent: isMobileSize ? 0 : -50,
                yPercent: isMobileSize ? 100 : 0,
                opacity: 0,
                ease: "expo",
                duration: 3,
              }, "sameTimeSixthScreen");

            /** Config intro FINISHES */
              
                /** Config outro STARTS */
            const tlConfigOutro = gsap.timeline({
              scrollTrigger: {
                trigger: "#testimonials",
                start: "top bottom",
                end: isMobileSize ? "bottom top" : "bottom 50%",
                endTrigger: "#testimonials",
                scrub: true,
                
              }
            })
  
              tlConfigOutro.to(".price-line-contain", {
                yPercent: isMobileSize ? -20 : -70,
                opacity: 0,
                ease: "expo",
                duration: 1,
              }, "sameTimeSixthScreenOutro");
              tlConfigOutro.to(".left-contain", {
                xPercent: isMobileSize ? 0 : -50,
                yPercent: isMobileSize ? -100 : 0,
                opacity: 0,
                ease: "expo",
                duration: 3,
              }, "sameTimeSixthScreenOutro");
            /** Config outro FINISHES */  

          })

        mm.current.add("(max-width: 991px)", () => {

            // Hero Leave anim
  
            //gsap.set(".hero-shadow", { yPercent: 0, opacity: 1 });
  
            const tlHeroLeaveMobile = gsap.timeline({
              scrollTrigger: {
                trigger: "#section2",
                start: "top bottom",
                end: "bottom 50%",
                endTrigger: "#section2",
                scrub: true,
              }
            })
  
            tlHeroLeaveMobile.to(".hero-shadow", {
                yPercent: 600,
                opacity: 0,
                ease: "expo",
                duration: 0.5,
              }, "sameTime");
              tlHeroLeaveMobile.to(".hero-line", {
                yPercent: -200,
                ease: "expo",
                duration: 0.5,
              },"sameTime");
              tlHeroLeaveMobile.to(".h1", {
                yPercent: -50,
                
                ease: "expo",
                duration: 0.5,
              },"sameTime");
              tlHeroLeaveMobile.to(".h2", {
                yPercent: -100,
                ease: "expo",
                duration: 0.5,
              },"sameTime");


  
            })
        
    })


    //Camera moves on mousemove
    const pointer = useRef({ x: 0, y: 0 });
    useEffect(() => {
      // Listen for mouse move events on the document
      document.addEventListener("mousemove", handleMouseMove);
  
      // Remove the event listener when the component unmounts
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
      };
    }, []);
  
    const handleMouseMove = event => {
      const canvas = document.getElementById("root");
      const canvasRect = canvas.getBoundingClientRect();
  
      const mouseX = event.clientX - canvasRect.left;
      const mouseY = event.clientY - canvasRect.top;
  
      // Calculate the mouse position relative to the canvas
      pointer.current = {
        x: (mouseX / canvasRect.width) * 2 - 1,
        y: -(mouseY / canvasRect.height) * 2 + 1,
      };
    };
  
    useFrame(() => {
     
     
      gsap.to(wholeModel.current.rotation, {
        x: pointer.current.y / 50 ,
        ease: "power1.easeOut",
      });
      
      gsap.to(wholeModel.current.rotation, {
        y: pointer.current.x / 50 ,
        ease: "power1.easeOut",
      });
        
    });
  



        /* Scroll animation FINISHES */
    

        return (
            <group ref={group} {...props} dispose={null}>
              <group name="Scene">
                <group name="Armature001" ref={wholeModel} position={[0, -0.028, -0.082]} scale={0.559}>
                  <mesh
                    name="BézierCircle001"
                    castShadow
                    receiveShadow
                    geometry={nodes.BézierCircle001.geometry}
                    material={nodes.BézierCircle001.material}
                    position={[0.006, -0.209, 0.165]}
                    rotation={[0.101, 0, 0]}
                    scale={0.193}>
                    <mesh
                      name="BézierCircle"
                      castShadow
                      receiveShadow
                      geometry={nodes.BézierCircle.geometry}
                      material={nodes.BézierCircle.material}
                      position={[0, 0.103, -0.017]}
                    />
                  </mesh>
                  <mesh
                    name="Glass"
                    castShadow
                    receiveShadow
                    geometry={nodes.Glass.geometry}
                    material={materials['Blue Glasses']}
                    position={[0.001, 0.05, 0.147]}
                    scale={[0.186, 0.151, 0.151]}
                  />
                  <group name="GlassTester" position={[0.001, 0.05, 0.147]} scale={[0.186, 0.151, 0.151]}>
                    <mesh
                      name="mesh001"
                      castShadow
                      receiveShadow
                      geometry={nodes.mesh001.geometry}
                      material={materials.colGlass}
                    />
                    <mesh
                      name="mesh001_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.mesh001_1.geometry}
                      material={materials['Black glass']}
                    />
                  </group>
                  <mesh
                    name="Helmet"
                    castShadow
                    receiveShadow
                    geometry={nodes.Helmet.geometry}
                    material={materials.HelmetMaterial}
                    position={[0.001, 0.027, 171.515]}
                    rotation={[-2.743, 0, Math.PI]}
                    scale={0.003}
                  />
                  <primitive object={nodes.Bone} />
                </group>
                <group
                  name="CameraRig"
                  position={[0, 0.058, 0]}
                  rotation={[1.276, -0.001, -3.14]}
                  scale={0.073}>
                  <PerspectiveCamera
                    name="Camera"
                    makeDefault={true}
                    far={1000}
                    near={0.1}
                    fov={fovNewTabletProof}
                    position={[0, 6.441, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={2.368}
                  />
                </group>
                <directionalLight
                  name="Sun"
                  intensity={0.683}
                  decay={2}
                  position={[-0.002, 0.083, -0.036]}
                  rotation={[-Math.PI / 2, 0, 0]}>
                  <group position={[0, 0, -1]} />
                </directionalLight>
                <pointLight
                  name="Point"
                  intensity={0.243514}
                  decay={2}
                  position={[0, -0.042, 0.015]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
              </group>
            </group>
          )
        }
        
  
  useGLTF.preload(filename)
