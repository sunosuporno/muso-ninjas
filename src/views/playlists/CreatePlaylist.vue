<template>
  <p>Create Playlist</p>
  <form @submit.prevent="handleSubmit">
    <h4>Create a new playlist</h4>
    <input type="text" placeholder="Playlist Title" v-model="title" required>
    <textarea required placeholder="playlist descsription..." v-model="description"></textarea>
    <label>Upload playlist cover image</label>
    <input type="file" @change="handleChange">
    <div class="error">{{ fileError }}</div>
    <div class="error"></div>
    <button v-if="!isPending">Create</button>
    <button v-else disabled>Creating...</button>
  </form>
</template>

<script>
import {ref} from '@vue/reactivity'
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import {timestamp} from "@/firebase/config";
import {useRouter} from 'vue-router'

export default {
setup(){
    const title = ref('');
    const description = ref('');
    const file = ref(null)
    const fileError = ref(null);
    const {url, filePath, uploadImage} = useStorage();
    const {error, addDoc} = useCollection('playlists');
    const {user} = getUser();
    const isPending = ref(false);
    const router = useRouter();

    const handleSubmit = async () => {
        if(file.value){
            isPending.value = true;
            await uploadImage(file.value);
            console.log("image uploaded. Url: ", url.value);
            const res = await addDoc({
                title: title.value,
                description: description.value,
                userId: user.value.uid,
                userName: user.value.displayName,
                coverUrl: url.value,
                filePath: filePath.value,
                songs: [],
                createdAt: timestamp()
            })
            isPending.value = false;
            if(!error.value){
                router.push({name: 'PlaylistDetails', params: {id: res.id}})
            }
        }
    }

    //allowed file types
    const types = ['image/png', 'image/jpeg'] 

    const handleChange = (e) => {
        const selected  = e.target.files[0]
        console.log(selected);

        if(selected && types.includes(selected.type)){
            file.value = selected
            fileError.value = null
        } else {
            file.value = null
            fileError.value = 'Please upload a valid image file (png/jpeg)'
        }
    }
    return {
        title,
        description,
        handleSubmit,
        handleChange,
        fileError,
        isPending
    }
    
}
}
</script>

<style>
  input[type="file"] {
    border: 0;
    padding: 0;
  }
  label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
  }
  button {
    margin-top: 20px;
  }
</style>