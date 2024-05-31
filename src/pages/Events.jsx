import { useState } from "react";
import { Box, Button, Container, Flex, FormControl, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from "../integrations/supabase/index.js";

const Events = () => {
  const { data: events, isLoading, isError } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [newEvent, setNewEvent] = useState({ name: "", date: "", description: "", venue_id: "" });
  const [editingEvent, setEditingEvent] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = () => {
    addEvent.mutate(newEvent);
    setNewEvent({ name: "", date: "", description: "", venue_id: "" });
  };

  const handleUpdateEvent = () => {
    updateEvent.mutate(editingEvent);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id) => {
    deleteEvent.mutate(id);
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading events</Text>;

  return (
    <Container maxW="container.md" py={4}>
      <VStack spacing={4}>
        <Box w="100%">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={newEvent.name} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input name="date" value={newEvent.date} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input name="description" value={newEvent.description} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Venue ID</FormLabel>
            <Input name="venue_id" value={newEvent.venue_id} onChange={handleInputChange} />
          </FormControl>
          <Button mt={4} colorScheme="teal" onClick={handleAddEvent}>Add Event</Button>
        </Box>

        {events.map(event => (
          <Box key={event.id} p={4} shadow="md" borderWidth="1px" w="100%">
            <Text fontWeight="bold">{event.name}</Text>
            <Text>{event.date}</Text>
            <Text>{event.description}</Text>
            <Text>Venue ID: {event.venue_id}</Text>
            <Flex mt={2}>
              <Button size="sm" colorScheme="blue" onClick={() => setEditingEvent(event)}>Edit</Button>
              <Button size="sm" colorScheme="red" ml={2} onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
            </Flex>
          </Box>
        ))}

        {editingEvent && (
          <Box w="100%">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input name="name" value={editingEvent.name} onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input name="date" value={editingEvent.date} onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input name="description" value={editingEvent.description} onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>Venue ID</FormLabel>
              <Input name="venue_id" value={editingEvent.venue_id} onChange={(e) => setEditingEvent({ ...editingEvent, venue_id: e.target.value })} />
            </FormControl>
            <Button mt={4} colorScheme="teal" onClick={handleUpdateEvent}>Update Event</Button>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Events;