import { useState, useEffect } from 'react';
import { FlatList, View, Text, Image, TextInput, Button } from 'react-native';

const imageUrls = [
  'https://placekitten.com/200/100',
  'https://placebear.com/200/100',
  'https://placeimg.com/200/100/nature',
  'https://placeimg.com/200/100/tech',
  'https://placeimg.com/200/100/arch',
];

const subscribers = [];
function broadcastUpdate(post) {
  subscribers.forEach((cb) => cb(post));
}
function subscribeToUpdates(cb) {
  subscribers.push(cb);
}

function Post({ post, onUpdate }) {
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    function handleUpdate(updatedPost) {
      if (updatedPost.id === post.id) {
        setComments(updatedPost.comments);
      }
    }
    subscribeToUpdates(handleUpdate);
    return () => {};
  }, [post.id]);

  function addComment() {
    if (!newComment.trim()) return;
    const updatedPost = { ...post, comments: [...comments, newComment.trim()] };
    onUpdate(updatedPost);
    broadcastUpdate(updatedPost);
    setNewComment('');
  }

  return (
    <View style={{ margin: 10, padding: 10, borderWidth: 1 }}>
      <Text style={{ fontWeight: 'bold' }}>{post.title}</Text>
      <Image style={{ width: 200, height: 100 }} source={{ uri: post.image }} />
      <Text>{post.summary}</Text>
      <Text>Comentários:</Text>
      {comments.map((c, idx) => (
        <Text key={idx}>- {c}</Text>
      ))}
      <TextInput
        placeholder="Escreva seu comentário"
        value={newComment}
        onChangeText={setNewComment}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 5,
          marginVertical: 5,
          borderRadius: 5,
        }}
      />
      <Button title="Comentar" onPress={addComment} />
    </View>
  );
}

export default function FacebookTimeline() {
  const [posts, setPosts] = useState(
    Array(500).fill(0).map((_, idx) => ({
      id: idx,
      title: `Título ${idx + 1}`,
      image: imageUrls[idx % imageUrls.length],
      summary: `Resumo do post ${idx + 1}`,
      comments: [],
    }))
  );

  function handleUpdatePost(updatedPost) {
    setPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Post post={item} onUpdate={handleUpdatePost} />
      )}
      initialNumToRender={10}
      maxToRenderPerBatch={20}
      windowSize={21}
    />
  );
}
