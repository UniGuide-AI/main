import type { Resource } from '../types/resources.ts';
import { supabase } from './supabase.ts';

export async function matchResources(
  userNeeds: string[],
  province: string,
  university: string,
  message: string,
  urgency: 'low' | 'medium' | 'high' = 'low'
): Promise<Resource[]> {
  try {
    // 1. Fetch resources from Supabase
    console.log('Matching resources for:', { userNeeds, province, university, urgency });
    let query = supabase.from('resources').select('*');

    // 2. Filter by province
    if (province && province !== 'unknown') {
      const prov = province.toUpperCase();
      query = query.eq('province', prov);
    }

    const { data: resources, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return [];
    }

    if (!resources || resources.length === 0) {
      console.warn('No resources found in database for province:', province);
      return [];
    }

    // 3. Filter and compute scores
    const scoredResources = resources
      .filter((res: Resource) => {
        const dbUni = (res.university || '').toLowerCase();
        const userUni = (university || '').toLowerCase();
        
        const uniMatch = dbUni === userUni || 
                         dbUni === 'all' || 
                         userUni === 'unknown' ||
                         dbUni.includes(userUni) ||
                         userUni.includes(dbUni);
                         
        const subcatMatch = userNeeds.length === 0 || res.subcategory.some(sub => userNeeds.includes(sub));
        
        return uniMatch && subcatMatch;
      })
      .map((res: Resource) => {
        let score = 0;

        // +5 if subcategory matches detected need
        const matchingSubcats = res.subcategory.filter(sub => userNeeds.includes(sub));
        score += matchingSubcats.length * 5;

        // +3 if province matches
        if (res.province === province) score += 3;

        // +4 if university matches exactly
        if (res.university === university) score += 4;
        // +2 if university = "All"
        else if (res.university === 'All') score += 2;

        // +2 if keywords match user message
        const lowerMessage = message.toLowerCase();
        const keywordMatches = res.keywords.filter(kw => lowerMessage.includes(kw.toLowerCase()));
        score += keywordMatches.length * 2;

        // EMERGENCY BOOST
        if (urgency === 'high') {
          const isEmergencyService = res.priority === 1 || 
                                     res.keywords.some(k => ['crisis', 'emergency', '24/7', 'helpline', 'suicide'].includes(k.toLowerCase()));
          if (isEmergencyService) score += 50; // Massive boost for emergency services
        }

        // Lower priority number ranks higher
        score -= (res.priority || 5);

        return { ...res, score };
      });

    // 4. Sort by score descending
    return scoredResources
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, 5);
  } catch (err) {
    console.error('Match error:', err);
    return [];
  }
}
