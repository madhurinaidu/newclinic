interface Participant {
  name: string;
  userId: string;
}

interface Participants {
  Doctor: Participant;
  Patients: Participant;
}

interface Event {
  _id: string;
  Repeats: string;
  MeetingToBeVerified: boolean;
  MeetingID: string;
  MeetingRoomID: string;
  MeetingStatusID: string;
  Title: string;
  StartTime: string;
  EndTime: string;
  CreatedBy: string;
  Location: string;
  Description: string;
  Participants: Participants;
  createdAt: string;
  updatedAt: string;
  hasJoined: boolean;
}
export type { Event, Participant, Participants };
