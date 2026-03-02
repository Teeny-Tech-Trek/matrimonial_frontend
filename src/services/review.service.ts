import api from "./api";

export interface ReviewPayload {
  name: string;
  city: string;
  rating: number;
  text: string;
}

const reviewService = {
  async submitReview(payload: ReviewPayload) {
    const response = await api.post("/reviews", payload);
    return response.data;
  },

  async getPublicReviews() {
    const response = await api.get("/reviews");
    return response.data;
  },
};

export default reviewService;

