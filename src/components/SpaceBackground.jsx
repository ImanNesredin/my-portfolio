import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const GEOMETRY_TYPES = [
  'box', 'tetrahedron', 'octahedron', 'icosahedron', 'dodecahedron',
  'torus', 'torusKnot', 'cone', 'cylinder', 'sphere', 'bipyramid', 'ring',
]

const GRADIENTS = [
  ['#ff0080', '#7928ca', '#00dfd8'],
  ['#ff4d00', '#ffaa00', '#ff0044'],
  ['#00d4aa', '#0099ff', '#6600ff'],
  ['#ffd700', '#ff8c00', '#ff4500'],
  ['#00ff88', '#00ccff', '#0066ff'],
  ['#ff00cc', '#ff5500', '#ffcc00'],
  ['#a855f7', '#ec4899', '#f43f5e'],
  ['#06b6d4', '#3b82f6', '#6366f1'],
]

function createWireframeGeometry(type, size) {
  let geo
  switch (type) {
    case 'box': geo = new THREE.BoxGeometry(size, size, size, 1, 1, 1); break
    case 'tetrahedron': geo = new THREE.TetrahedronGeometry(size, 0); break
    case 'octahedron': geo = new THREE.OctahedronGeometry(size * 1.2, 0); break
    case 'icosahedron': geo = new THREE.IcosahedronGeometry(size, 0); break
    case 'dodecahedron': geo = new THREE.DodecahedronGeometry(size, 0); break
    case 'torus': geo = new THREE.TorusGeometry(size * 0.6, size * 1.25, 8, 20); break
    case 'torusKnot': geo = new THREE.TorusKnotGeometry(size * 0.2, size * 0.15, 64, 8); break
    case 'cone': geo = new THREE.ConeGeometry(size * 0.6, size * 1.2, 8, 1); break
    case 'cylinder': geo = new THREE.CylinderGeometry(size * 0.4, size * 0.4, size, 8, 1); break
    case 'sphere': geo = new THREE.IcosahedronGeometry(size * 0.7, 1); break
    case 'bipyramid': geo = new THREE.ConeGeometry(size * 1.5, size, 6, 1); break
    case 'ring': geo = new THREE.RingGeometry(size * 0.3, size * 0.7, 16); break
    default: geo = new THREE.BoxGeometry(size, size, size)
  }
  return geo
}

function generateScatteredShapes() {
  const items = []
  const count = 22
  for (let i = 0; i < count; i++) {
    const type = GEOMETRY_TYPES[i % GEOMETRY_TYPES.length]
    const grad = GRADIENTS[i % GRADIENTS.length]
    const size = 0.5 + Math.random() * 0.45
    const opacity = 0.7 + Math.random() * 0.3
    const x = (Math.random() - 0.5) * 22
    const y = (Math.random() - 0.5) * 16
    const z = (Math.random() - 0.5) * 10 - 1
    items.push({
      id: i, type, colors: grad, size, opacity,
      position: [x, y, z],
      rotSpeed: [
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.05,
      ],
      rotOffset: [Math.random() * 6.28, Math.random() * 6.28, Math.random() * 6.28],
      wobbleSpeed: 0.1 + Math.random() * 0.18,
      wobbleRadius: 0.03 + Math.random() * 0.05,
      wobbleOffset: Math.random() * 6.28,
      pulseSpeed: 0.15 + Math.random() * 0.25,
      pulseAmount: 0.008 + Math.random() * 0.015,
      pulseOffset: Math.random() * 6.28,
    })
  }
  return items
}

function generateEdgeShapes() {
  const items = []
  const edgePositions = [
    { x: -9, y: -6, z: -3 },
    { x: 9, y: -6, z: -2 },
    { x: 0, y: 7, z: -1 },
    { x: 0, y: -7, z: -3 },
    { x: -7, y: 4, z: -4 },
    { x: 7, y: -4, z: -2 },
    { x: -10, y: 7, z: -2 },
    { x: 0, y: 0, z: -3 },
  ]
  for (let i = 0; i < edgePositions.length; i++) {
    const type = GEOMETRY_TYPES[(i + 3) % GEOMETRY_TYPES.length]
    const grad = GRADIENTS[(i + 2) % GRADIENTS.length]
    const size = 1.4 + Math.random() * 1.6
    const opacity = 0.35 + Math.random() * 0.25
    const pos = edgePositions[i]
    items.push({
      id: 100 + i, type, colors: grad, size, opacity,
      position: [pos.x, pos.y, pos.z],
      rotSpeed: [(Math.random() - 0.5) * 0.06, (Math.random() - 0.5) * 0.06, (Math.random() - 0.5) * 0.03],
      rotOffset: [Math.random() * 6.28, Math.random() * 6.28, Math.random() * 6.28],
      wobbleSpeed: 0.08 + Math.random() * 0.12,
      wobbleRadius: 0.02 + Math.random() * 0.03,
      wobbleOffset: Math.random() * 6.28,
      pulseSpeed: 0.12 + Math.random() * 0.18,
      pulseAmount: 0.005 + Math.random() * 0.01,
      pulseOffset: Math.random() * 6.28,
    })
  }
  return items
}

function generateHugeShapes() {
  return [
    {
      id: 200,
      type: 'torusKnot',
      colors: ['#ffd700', '#ff8c00', '#ff4500'],
      size: 3.5,
      opacity: 0.7,
      position: [-5, 4, -2],
      rotSpeed: [0.03, 0.05, 0.02],
      rotOffset: [0, 0, 0],
      wobbleSpeed: 0.1,
      wobbleRadius: 0.02,
      wobbleOffset: 0,
      pulseSpeed: 0.15,
      pulseAmount: 0.01,
      pulseOffset: 0,
    },
    {
      id: 201,
      type: 'icosahedron',
      colors: ['#00ff88', '#00ccff', '#0066ff'],
      size: 4.0,
      opacity: 0.6,
      position: [1, 0, -3],
      rotSpeed: [0.04, 0.03, 0.02],
      rotOffset: [1, 2, 0.5],
      wobbleSpeed: 0.08,
      wobbleRadius: 0.015,
      wobbleOffset: 1,
      pulseSpeed: 0.12,
      pulseAmount: 0.008,
      pulseOffset: 2,
    },
    {
      id: 202,
      type: 'dodecahedron',
      colors: ['#ff00cc', '#ff5500', '#ffcc00'],
      size: 3.2,
      opacity: 0.65,
      position: [6, -1, -2],
      rotSpeed: [0.02, 0.04, 0.03],
      rotOffset: [2, 1, 3],
      wobbleSpeed: 0.12,
      wobbleRadius: 0.02,
      wobbleOffset: 2,
      pulseSpeed: 0.18,
      pulseAmount: 0.012,
      pulseOffset: 1,
    },
  ]
}

function WireframeShape({ data }) {
  const lineRef = useRef()

  const { edgesGeometry, lineMaterial } = useMemo(() => {
    const geo = createWireframeGeometry(data.type, data.size)
    const edges = new THREE.EdgesGeometry(geo, 15)

    const count = edges.attributes.position.count
    const colors = new Float32Array(count * 3)
    const c1 = new THREE.Color(data.colors[0])
    const c2 = new THREE.Color(data.colors[1])
    const c3 = new THREE.Color(data.colors[2])

    for (let i = 0; i < count; i += 2) {
      const t = i / count
      const fromColor = t < 0.33 ? c1 : t < 0.66 ? c2 : c3
      const toColor = t < 0.33 ? c2 : t < 0.66 ? c3 : c1
      const alpha = (t % 0.33) / 0.33
      const r = fromColor.r + (toColor.r - fromColor.r) * alpha
      const g = fromColor.g + (toColor.g - fromColor.g) * alpha
      const b = fromColor.b + (toColor.b - fromColor.b) * alpha
      colors[i * 3] = r; colors[i * 3 + 1] = g; colors[i * 3 + 2] = b
      colors[(i + 1) * 3] = r; colors[(i + 1) * 3 + 1] = g; colors[(i + 1) * 3 + 2] = b
    }
    edges.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const mat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: data.opacity,
    })

    return { edgesGeometry: edges, lineMaterial: mat }
  }, [data])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const line = lineRef.current
    if (!line) return

    const mx = data.position[0] + Math.sin(t * data.wobbleSpeed + data.wobbleOffset) * data.wobbleRadius
    const my = data.position[1] + Math.cos(t * data.wobbleSpeed * 0.7 + data.wobbleOffset) * data.wobbleRadius * 0.6
    const mz = data.position[2] + Math.sin(t * data.wobbleSpeed * 0.5 + data.wobbleOffset * 2) * data.wobbleRadius * 0.3

    line.position.set(mx, my, mz)

    const rx = t * data.rotSpeed[0] + data.rotOffset[0]
    const ry = t * data.rotSpeed[1] + data.rotOffset[1]
    const rz = t * data.rotSpeed[2] + data.rotOffset[2]
    line.rotation.set(rx, ry, rz)

    const pulse = 1 + Math.sin(t * data.pulseSpeed + data.pulseOffset) * data.pulseAmount
    line.scale.setScalar(pulse)

    const breathe = 0.85 + Math.sin(t * 0.2 + data.pulseOffset) * 0.15
    lineMaterial.opacity = data.opacity * breathe
  })

  return (
    <lineSegments ref={lineRef} geometry={edgesGeometry} material={lineMaterial} />
  )
}

function GeometryScene() {
  const shapes = useMemo(() => [...generateScatteredShapes(), ...generateEdgeShapes(), ...generateHugeShapes()], [])
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      {shapes.map((shape) => (
        <WireframeShape key={shape.id} data={shape} />
      ))}
    </>
  )
}

function CSSStars() {
  const stars = useMemo(() => {
    return Array.from({ length: 220 }).map((_, i) => {
      const size = Math.random() * 4 + 2
      const left = Math.random() * 100
      const top = Math.random() * 100
      const delay = Math.random() * 5
      const duration = 1.5 + Math.random() * 3
      return { key: i, size, left, top, delay, duration }
    })
  }, [])

  return (
    <div className="space-stars" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.key}
          className="space-star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

function MilkyWay() {
  return (
    <div className="milkyway" aria-hidden="true">
      <div className="milkyway-band" />
      <div className="milkyway-stars" />
    </div>
  )
}

export default function SpaceBackground() {
  return (
    <div className="space-bg" aria-hidden="true">
      <CSSStars />
      <MilkyWay />
      <div className="space-object planet planet-jupiter" aria-hidden="true" />
      <div className="space-object planet planet-pluto" aria-hidden="true" />
      <div className="space-object planet planet-2" aria-hidden="true" />
      <div className="space-object planet planet-3" aria-hidden="true" />
      <div className="space-object moon dark-only" aria-hidden="true" />
      <div className="space-object sun light-only" aria-hidden="true" />
      <div className="space-canvas-wrap">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <GeometryScene />
        </Canvas>
      </div>
    </div>
  )
}

