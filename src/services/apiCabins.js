import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log(error);
    throw new Error('cabins could not be loaded');
  }

  return data;
}

export async function createCabin(newCabin, id) {
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);
  let imagePath;

  // Upload cabin image if it doesn't have an image path
  if (!hasImagePath) {
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
      '/',
      ''
    );
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;

    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image);

    if (storageError) {
      console.log(storageError);
      throw new Error('Cabin image could not be uploaded');
    }
  }

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

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('Cabin could not be deleted');
  }
}
