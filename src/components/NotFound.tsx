// src/components/NotFound.tsx
import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Plane, TowerControl, PlaneLanding } from 'lucide-react'

type PlaneState = {
    x: number, y: number
    vx: number, vy: number
    size: number
}

export default function NotFound() {
    const containerRef = useRef<HTMLDivElement>(null)
    // initialize three planes with random velocity
    const planes = useRef<PlaneState[]>([
        { x: 50, y: 100, vx: 2.5, vy: 1.7, size: 40 },
        { x: 300, y: 200, vx: -1.8, vy: 2.2, size: 32 },
        { x: 500, y: 50, vx: 3, vy: -3.2, size: 48 },
        { x: 1000, y: 14, vx: 4.1, vy: -2.9, size: 56 },
        { x: 1000, y: 500, vx: 1.1, vy: 3.9, size: 35 },
    ])

    useEffect(() => {
        let raf: number
        const step = () => {
            const cw = containerRef.current!.clientWidth
            const ch = containerRef.current!.clientHeight

            planes.current.forEach(p => {
                // move
                p.x += p.vx
                p.y += p.vy
                // bounce X
                if (p.x < 0) { p.x = 0; p.vx = -p.vx }
                if (p.x + p.size > cw) { p.x = cw - p.size; p.vx = -p.vx }
                // bounce Y
                if (p.y < 0) { p.y = 0; p.vy = -p.vy }
                if (p.y + p.size > ch) { p.y = ch - p.size; p.vy = -p.vy }
            })

            // trigger re‑draw
            setFrame(f => f + 1)
            raf = requestAnimationFrame(step)
        }
        raf = requestAnimationFrame(step)
        return () => cancelAnimationFrame(raf)
    }, [])

    // dummy state to trigger re‑render
    const [, setFrame] = React.useState(0)
    let temp = 1;
    return (
        <div
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center
                 bg-gradient-to-br from-[#581F48] to-[#8C1D40] overflow-hidden"
        >
            {/* runways */}
            <div className="absolute top-0 w-full h-4 runway-stripes" />
            <div className="absolute bottom-0 w-full h-4 runway-stripes" />

            {/* bouncing planes */}
            {planes.current.map((p, i) => {
                const angle = ((((Math.atan2(p.vy, p.vx) * (180 / Math.PI)) + 360) % 360) + 45) % 360
                return (
                    <Plane
                        key={i}
                        size={p.size}
                        className="text-white/70 absolute"
                        style={{ left: `${p.x}px`, top: `${p.y}px`, transform: `rotate(${angle}deg)` }}
                    />
                )
            })}

            {/* central message */}
            <div className="relative z-10 bg-white/10 backdrop-blur rounded-2xl p-8 text-center max-w-sm">
                <h1
                    className="text-6xl text-white font-bold"
                    style={{ fontFamily: 'Stencilla, monospace' }}
                >404</h1>
                <p className="mt-2 text-white/100 font-bold">Oops! this airport doesn’t exist.</p>
                <p className="mt-2 text-white/80">
                    The page you’re looking for is going to have a number to call for a possible pilot deviation.
                </p>
                <Link
                    to="/"
                    className="mt-6 inline-flex items-center gap-2 bg-white text-[#581F48]
                     px-6 py-3 rounded-full shadow hover:bg-gray-100 transition"
                >
                    <PlaneLanding size={20} /> Back to the Gate
                </Link>
            </div>

            {/* control tower */}
            <TowerControl
                size={200}
                className="absolute bottom-2 right-4 text-white/90"
            />

            {/* stripe CSS */}
            <style>{`
        .runway-stripes {
          background: repeating-linear-gradient(
            to right,
            rgba(255,255,255,0.8) 0 8px,
            transparent 8px 16px
          );
        }
      `}</style>
        </div>
    )
}
