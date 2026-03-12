import React, { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { Resource } from '../types/resources';
import { MapPin, Info, X } from 'lucide-react';

interface CampusMapProps {
  resources: Resource[];
  university?: string;
}

// Default coordinates for universities
const UNIVERSITY_COORDS: Record<string, [number, number]> = {
  'Dalhousie University': [44.6366, -63.5917],
  "Saint Mary's University": [44.6317, -63.5817],
  'UPEI': [46.2572, -63.1399],
};

export default function CampusMap({ resources, university }: CampusMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedResource, setSelectedResource] = React.useState<Resource | null>(null);

  // Filter resources that have coordinates or we can guess them
  const mapResources = useMemo(() => {
    return resources.map(res => {
      if (res.latitude && res.longitude) return res;
      
      // Add some jitter so they don't overlap perfectly if they share university coords
      const base = UNIVERSITY_COORDS[res.university] || [44.6488, -63.5752]; // Default to Halifax
      const jitter = 0.002;
      return {
        ...res,
        latitude: base[0] + (Math.random() - 0.5) * jitter,
        longitude: base[1] + (Math.random() - 0.5) * jitter,
      };
    });
  }, [resources]);

  useEffect(() => {
    if (!svgRef.current || mapResources.length === 0) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Clear previous
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);

    // Create a projection
    // We'll center it on the average of the resources
    const avgLat = d3.mean(mapResources, d => d.latitude!) || 44.6;
    const avgLng = d3.mean(mapResources, d => d.longitude!) || -63.6;

    const projection = d3.geoMercator()
      .center([avgLng, avgLat])
      .scale(500000) // Very zoomed in
      .translate([width / 2, height / 2]);

    // Draw a simple background grid/rect
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#f8fafc")
      .attr("rx", 16);

    // Add some "campus" shapes (circles/rects) to make it look like a map
    const campusGroup = svg.append("g").attr("class", "campus-features");
    
    // Fake buildings/parks
    for (let i = 0; i < 10; i++) {
      campusGroup.append("rect")
        .attr("x", Math.random() * width)
        .attr("y", Math.random() * height)
        .attr("width", 40 + Math.random() * 60)
        .attr("height", 30 + Math.random() * 40)
        .attr("fill", "#e2e8f0")
        .attr("opacity", 0.5)
        .attr("rx", 4);
    }

    // Draw markers
    const markers = svg.selectAll(".marker")
      .data(mapResources)
      .enter()
      .append("g")
      .attr("class", "marker")
      .attr("transform", d => {
        const [x, y] = projection([d.longitude!, d.latitude!])!;
        return `translate(${x}, ${y})`;
      })
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        setSelectedResource(d);
      });

    // Marker shadow
    markers.append("circle")
      .attr("r", 12)
      .attr("fill", "#10b981")
      .attr("opacity", 0.2);

    // Marker pin
    markers.append("path")
      .attr("d", "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z")
      .attr("fill", "#059669")
      .attr("transform", "translate(-12, -22) scale(1)");

    // Labels (only if zoomed in enough or on hover)
    markers.append("text")
      .text(d => d.service_name)
      .attr("text-anchor", "middle")
      .attr("dy", 15)
      .attr("font-size", "10px")
      .attr("font-weight", "600")
      .attr("fill", "#064e3b")
      .attr("opacity", 0.8);

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 5])
      .on("zoom", (event) => {
        svg.selectAll("g").attr("transform", event.transform);
      });

    // svg.call(zoom); // Optional: enable zoom

  }, [mapResources]);

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] bg-white rounded-3xl border border-emerald-100 overflow-hidden shadow-sm">
      <svg 
        ref={svgRef} 
        className="w-full h-full"
      />
      
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border border-emerald-100 text-[10px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-2">
        <MapPin size={12} />
        Campus Navigator
      </div>

      {selectedResource && (
        <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-2xl border border-emerald-100 shadow-xl animate-in slide-in-from-bottom-4">
          <button 
            onClick={() => setSelectedResource(null)}
            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600"
          >
            <X size={16} />
          </button>
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
              <Info size={20} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">{selectedResource.service_name}</h4>
              <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{selectedResource.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100">
                  {selectedResource.category}
                </span>
                <span className="text-[10px] text-slate-400">
                  {selectedResource.address || 'On Campus'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {mapResources.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-50/50">
          <div className="text-center">
            <MapPin size={32} className="mx-auto text-slate-300 mb-2" />
            <p className="text-sm text-slate-500">No locations found for this query</p>
          </div>
        </div>
      )}
    </div>
  );
}
