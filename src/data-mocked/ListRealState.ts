export const realEstateData = {
  status: "success",
  results: 3,
  last_update: "2025-06-24T08:30:00Z",
  data: [
    {
      property_id: "med-apt-001",
      title: "Lujoso Apartamento en El Poblado con Vista Panorámica",
      description: "Amplio apartamento de 3 habitaciones en torre premium con acabados de lujo, piscina infinita y gimnasio. Excelente estado, pisos en mármol, cocina integral con isla.",
      type: "apartamento",
      for_sale: true,
      price: 850000000,
      currency: "COP",
      location: {
        zone: "El Poblado",
        neighborhood: "Manila",
        address: "Carrera 43A # 1-50 Sur",
        latitude: 6.2084,
        longitude: -75.5671
      },
      specs: {
        bedrooms: 3,
        bathrooms: 2.5,
        area_m2: 120,
        floor: 15,
        stratum: 6,
        parking_spots: 1,
        year_built: 2020
      },
      amenities: [
        "piscina",
        "gimnasio",
        "parqueadero cubierto",
        "ascensor",
        "vigilancia 24/7",
        "zona BBQ"
      ],
      images: [
        "https://example.com/img/med-apt-001-1.jpg",
        "https://example.com/img/med-apt-001-2.jpg"
      ],
      contact: {
        agency: "Inmobiliaria Premium",
        agent: "María Rodríguez",
        phone: "+574604123456"
      },
      listing_date: "2025-06-10"
    },
    {
      property_id: "med-house-025",
      title: "Casa Moderna en Laureles con Jardín",
      description: "Casa de 2 niveles con diseño contemporáneo, amplios espacios sociales y jardín privado. Ideal para familias, cerca de Unidades Deportivas y universidades.",
      type: "casa",
      for_sale: false,
      rental_price: 4200000,
      currency: "COP",
      location: {
        zone: "Laureles-Estadio",
        neighborhood: "Laureles",
        address: "Calle 33B # 70-25",
        latitude: 6.2508,
        longitude: -75.5902
      },
      specs: {
        bedrooms: 4,
        bathrooms: 3,
        area_m2: 210,
        floors: 2,
        stratum: 4,
        parking_spots: 2,
        year_built: 2015
      },
      amenities: [
        "terraza",
        "estudio",
        "jardín",
        "cocina a gas"
      ],
      images: [
        "https://example.com/img/med-house-025-1.jpg"
      ],
      contact: {
        agency: "Casas & Más",
        agent: "Carlos Vélez",
        phone: "+574604654321"
      },
      listing_date: "2025-06-22"
    },
    {
      property_id: "med-com-078",
      title: "Oficina en Centro Comercial Premium",
      description: "Espacio comercial en zona dorada del CC Santafé. Alto tráfico, excelente visibilidad, listo para personalizar. Incluye mobiliario básico.",
      type: "comercial",
      for_sale: true,
      price: 320000000,
      currency: "COP",
      location: {
        zone: "El Poblado",
        neighborhood: "CC Santafé",
        address: "Local 205, Nivel 2",
        latitude: 6.1962,
        longitude: -75.5649
      },
      specs: {
        area_m2: 45,
        floors: 1,
        bathrooms: 0,
        year_built: 2018
      },
      amenities: [
        "aire acondicionado",
        "seguridad CC",
        "parqueadero rotativo",
        "ascensor",
        "wifi"
      ],
      images: [
        "https://example.com/img/med-com-078-1.jpg",
        "https://example.com/img/med-com-078-2.jpg",
        "https://example.com/img/med-com-078-3.jpg"
      ],
      contact: {
        agency: "Espacios Comerciales SAS",
        agent: "Laura Gutiérrez",
        phone: "+574604112233"
      },
      listing_date: "2025-06-15"
    }
  ],
  pagination: {
    current_page: 1,
    total_pages: 15,
    per_page: 3
  }
};