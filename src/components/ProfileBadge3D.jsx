import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ProfileBadge3D({ portrait, alt = '' }) {
  const hostRef = useRef(null)
  useEffect(() => {
    const host = hostRef.current
    if (!host) return undefined
    let renderer
    let geometry
    let material
    let observer
    let frame
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 4 / 5, 0.1, 20)
    camera.position.z = 4
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
      renderer.setSize(host.clientWidth || 320, host.clientHeight || 400, false)
      host.appendChild(renderer.domElement)
      geometry = new THREE.PlaneGeometry(2.4, 3)
      const texture = new THREE.TextureLoader().load(portrait, () =>
        renderer?.render(scene, camera),
      )
      material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })
      const plane = new THREE.Mesh(geometry, material)
      scene.add(plane)
      const render = () => {
        renderer?.render(scene, camera)
      }
      const onPointerMove = (event) => {
        const bounds = host.getBoundingClientRect()
        plane.rotation.y = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.12
        plane.rotation.x = -((event.clientY - bounds.top) / bounds.height - 0.5) * 0.08
        render()
      }
      observer = new ResizeObserver(() => {
        if (!renderer) return
        renderer.setSize(host.clientWidth, host.clientHeight, false)
        camera.aspect = host.clientWidth / host.clientHeight
        camera.updateProjectionMatrix()
        render()
      })
      observer.observe(host)
      host.addEventListener('pointermove', onPointerMove)
      render()
      frame = () => host.removeEventListener('pointermove', onPointerMove)
    } catch {
      renderer?.dispose()
    }
    return () => {
      frame?.()
      observer?.disconnect()
      geometry?.dispose()
      material?.map?.dispose()
      material?.dispose()
      renderer?.dispose()
      renderer?.domElement?.remove()
    }
  }, [portrait])
  return (
    <div
      ref={hostRef}
      role="img"
      aria-label={alt}
      className="absolute inset-0 overflow-hidden rounded-[inherit]"
    >
      <img
        src={portrait}
        alt=""
        width="600"
        height="750"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  )
}
