// Get URL parameters and parse them
export const getUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    const urlParams = {};
    
    // Get search term
    if (params.has('search')) {
      urlParams.search = params.get('search');
    }
    
    // Get consultation type
    if (params.has('consultation')) {
      urlParams.consultation = params.get('consultation');
    }
    
    // Get specialties
    if (params.has('specialties')) {
      urlParams.specialties = params.get('specialties');
    }
    
    // Get sort option
    if (params.has('sort')) {
      urlParams.sort = params.get('sort');
    }
    
    return urlParams;
  };
  
  // Update URL parameters without page reload
  export const updateUrlParams = (filters) => {
    const params = new URLSearchParams();
    
    // Add parameters only if they exist
    if (filters.search) {
      params.set('search', filters.search);
    }
    
    if (filters.consultation) {
      params.set('consultation', filters.consultation);
    }
    
    if (filters.specialties) {
      params.set('specialties', filters.specialties);
    }
    
    if (filters.sort) {
      params.set('sort', filters.sort);
    }
    
    // Update URL without page reload
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };