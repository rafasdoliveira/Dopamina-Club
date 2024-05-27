const { createClient } = require('@supabase/supabase-js');

const url = process.env.URL;
const apiKey = process.env.API_KEY;

const supabase = createClient(url, apiKey);

module.exports = supabase;