export interface Doctor {
  id: number;
  filtered_doctor: number;
  full_name: string;
  slug: string;
  city: {
    id: number;
    name: string;
  };
  url: string;
  text_info: string;
  auto_text_info: string | null;
  gender: string;
  promotion: boolean;
  verified: boolean;
  popular: boolean;
  call_now_status: number;
  book_appointment_status: number;
  website: string | null;
  display_picture: {
    url: string;
    alt_text: string;
  };
  calling_number: string | null;
  whatsapp_number: string | null;
  emails: string | null;
  experience: string;
  specializations: string[];
  services: string | null;
  facilities: {
    id: number;
    name: string;
    slug: string;
    url: string;
    fee: number;
    map_link: string;
    city: {
      name: string;
      slug: string;
    };
    area: {
      name: string;
      slug: string;
    };
    on_call: number;
    availability: {
      message: string;
    };
    calling_number: string | null;
    logo: {
      url: string;
      alt_text: string;
    };
  }[];
  ratings: {
    average_rating: number | null;
    rating_count: number;
  };
  answers: {
    answer_count: number;
    answer_url: string | null;
  };
}

export interface IAppointment {
  _id: string;
  Repeats: string;
  MeetingToBeVerified: boolean;
  MeetingID: string;
  MeetingRoomID: string;
  MeetingStatusID: string;
  Title: string;
  StartTime: string; // ISO 8601 format
  EndTime: string; // ISO 8601 format
  CreatedBy: string;
  Location: string;
  Description: string;
  Participants: {
    Patients: {
      name: string;
      statusId: number;
      userId: string;
    };
    Doctor: {
      emailid: string;
      name: string;
      userId: string;
    };
  };
  AppointmentStatus: {
    Booked: boolean;
    MeetingCompleted: boolean;
    CheckedIn: {
      Doctor: {
        Joined: boolean;
        Time: string;
      };
      Patient: {
        Joined: boolean;
        Time: string;
      };
    };
    checkedOut: {
      Doctor: {
        Ended: boolean;
        Time: string;
      };
      Patient: {
        Ended: boolean;
        Time: string;
      };
    };
    Completed: {
      PaymentDone: boolean;
      PrescriptionRecevied: boolean;
    };
    NoShow: boolean;
    Rescheduled: boolean;
  };
  createdAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format
  hasJoined: boolean;
}
