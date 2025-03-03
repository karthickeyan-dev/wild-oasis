import supabase, { supabaseUrl } from './supabase';

export async function getCabinsApi() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log(error);
    throw new Error('cabins could not be loaded');
  }

  return data;
}

export async function createCabinApi(newCabin, id) {
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin?.image?.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;

  let query = supabase.from('cabins');

  // Create cabin query
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }
  // Edit cabin query
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error('Cabin could not be created');
  }

  // Return data if it has Image Path
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  if (storageError) {
    console.log(storageError);
    throw new Error('Cabin image could not be uploaded');
  }

  return data;
}

export async function deleteCabinApi(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('Cabin could not be deleted');
  }
}
