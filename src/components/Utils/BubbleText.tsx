/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable require-jsdoc */
import {Html, Instance, Instances} from '@react-three/drei'
import React, {useCallback, useEffect, useRef, useState} from 'react'

import {BubbleTextType} from '../../utils/types'
import bubbleFragmentShader from '../../shaders/bubble/fragment.glsl'
import bubbleVertexShader from '../../shaders/bubble/vertex.glsl'
import {customDebug} from '../../utils/customDebug'
import {useFrame} from '@react-three/fiber'

// Settings
const FONT_NAME = 'system-ui'
const TEXTURE_FONT_SIZE = 50
const FONT_SCALE_FACTOR = 0.05

// Elements
const textCanvas = document.createElement('canvas')
textCanvas.width = textCanvas.height = 0
const textCtx = textCanvas.getContext('2d')

// Variables
type TextBoxType = {
  wTexture: number,
  wScene: number,
  hTexture: number,
  hScene: number,
}
class Particle {
  x: number
  y: number
  z: number
  scale: number
  maxScale: number
  deltaScale: number
  toDelete: boolean
  isFlying: boolean
  grow: Function

  constructor(x: number, y: number) {
    this.x = x + (.2 * (Math.random() - .5))
    this.y = y + (.2 * (Math.random() - .5))
    this.z = 0
    this.scale = .1 * Math.random()
    this.maxScale = Math.pow(Math.random(), 3)
    this.deltaScale = .1 * .1 * Math.random()
    this.toDelete = false
    this.isFlying = Math.random() < .06
    this.grow = () => {
      this.scale += this.deltaScale
      if (this.scale >= this.maxScale) {
        this.scale = 0
      } else if (this.toDelete) {
        this.deltaScale += .5
      }
      if (this.isFlying) {
        this.y -= (7 * this.deltaScale)
      }
    }
  }
}
let textureCoordinates: Array<any> = []

export const BubbleText = ({text, position, rotation, scale}: BubbleTextType) => {
  const bubbleTextElRef = useRef<HTMLDivElement>(null)
  const [textBox, setTextBox] = useState<TextBoxType>()
  const [particles, setParticles] = useState<Array<Particle>>([])

  const sampleCoordinates = useCallback(() => {
    if (!textCtx || !textBox || !text) {
      return
    }

    customDebug().log('BubbleText#sampleCoordinates')
    let newParticles: Array<Particle> = []

    // Draw text
    const lines = text.split(`\n`)
    const linesNumber = lines.length
    textCanvas.width = textBox.wTexture
    textCanvas.height = textBox.hTexture
    textCtx.font = `100 ${TEXTURE_FONT_SIZE}px ${FONT_NAME}`
    textCtx.fillStyle = '#2a9d8f'
    textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height)

    for (let i = 0; i < linesNumber; i++) {
      textCtx.fillText(lines[i], 0, (i + .8) * textBox.hTexture / linesNumber)
    }

    // Sample coordinates
    if (textBox.wTexture > 0) {
      // Image data to 2d array
      const imageData = textCtx.getImageData(0, 0, textCanvas.width, textCanvas.height)
      const imageMask = Array.from(Array(textCanvas.height), () => new Array(textCanvas.width))

      for (let i = 0; i < textCanvas.height; i++) {
        for (let j = 0; j < textCanvas.width; j++) {
          imageMask[i][j] = imageData.data[(j + (i * textCanvas.width)) * 4] > 0
        }
      }

      if (textureCoordinates.length !== 0) {
        // Clean up: delete coordinates and particles which disappeared on the prev step
        // We need to keep same indexes for coordinates and particles to reuse old particles properly
        textureCoordinates = textureCoordinates.filter((c) => !c.toDelete)
        newParticles = particles.filter((c) => !c.toDelete)

        // Go through existing coordinates (old to keep, toDelete for fade-out animation)
        textureCoordinates.forEach((c) => {
          if (imageMask[c.y]) {
            if (imageMask[c.y][c.x]) {
              c.old = true
              if (!c.toDelete) {
                imageMask[c.y][c.x] = false
              }
            } else {
              c.toDelete = true
            }
          } else {
            c.toDelete = true
          }
        })
      }

      // Add new coordinates
      for (let i = 0; i < textCanvas.height; i++) {
        for (let j = 0; j < textCanvas.width; j++) {
          if (imageMask[i][j]) {
            textureCoordinates.push({
              x: j,
              y: i,
              old: false,
              toDelete: false,
            })
          }
        }
      }
    } else {
      textureCoordinates = []
    }

    newParticles = textureCoordinates.map((c, cIdx) => {
      const x = c.x * FONT_SCALE_FACTOR
      const y = c.y * FONT_SCALE_FACTOR
      const p = (c.old && newParticles[cIdx]) ? newParticles[cIdx] : new Particle(x, y)

      if (c.toDelete) {
        p.toDelete = true
      }

      return p
    })

    setParticles(newParticles)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, textBox])

  const updateTextBox = () => {
    if (!bubbleTextElRef?.current) {
      setTimeout(updateTextBox, 100)
      return
    }

    const {clientWidth, clientHeight} = bubbleTextElRef.current
    const wTexture = clientWidth * 1.25
    const hTexture = clientHeight * 2
    const newTextBox: TextBoxType = {
      wTexture: wTexture,
      wScene: wTexture * FONT_SCALE_FACTOR,
      hTexture: hTexture,
      hScene: hTexture * FONT_SCALE_FACTOR,
    }
    customDebug().log('BubbleText#updateTextBox: newTextBox: ', newTextBox)
    setTextBox(newTextBox)
  }

  useEffect(() => {
    updateTextBox()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    sampleCoordinates()
  }, [sampleCoordinates])

  useFrame(() => {
    if (!particles.length) {
      return
    }

    const newParticles = particles.map((particle) => {
      particle.grow()
      return particle
    })
    setParticles(newParticles)
  })

  return (
    <group
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <Html>
        <div
          className='opacity-0'
          ref={bubbleTextElRef}
        >
          {text}
        </div>
      </Html>
      {particles.length && textBox?.wScene && textBox?.hScene &&
        <Instances
          limit={particles.length}
          range={particles.length}
          position={[-0.5 * textBox.wScene, -0.6 * textBox.hScene, 0]}
        >
          <icosahedronGeometry args={[0.15, 3]}/>
          <shaderMaterial
            transparent={true}
            // depthWrite={false}
            // blending={THREE.AdditiveBlending}
            // vertexColors={true}
            vertexShader={bubbleVertexShader}
            fragmentShader={bubbleFragmentShader}
          />
          {particles.map((particle, index) => {
            particle.grow()
            return (
              <Instance
                key={index}
                color='red'
                position={[particle.x, textBox.hScene - particle.y, particle.z]}
                scale={particle.scale}
              />
            )
          })}
        </Instances>
      }
    </group>
  )
}
