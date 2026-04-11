const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function fetchStrapi(endpoint: string, query?: string) {
  const url = `${STRAPI_URL}/api/${endpoint}${query ? `?${query}` : ''}`;
  
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`, // Add this later
      },
    });

    if (!response.ok) {
      throw new Error(`Strapi Fetch Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    return null;
  }
}
