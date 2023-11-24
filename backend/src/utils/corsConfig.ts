import { CorsOptions } from "cors";

const corsOpts: CorsOptions = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST","PATCH", "PUT", "DELETE","HEAD"],
}

export default corsOpts;