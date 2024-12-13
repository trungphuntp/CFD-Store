import RalatedPostBlogItem from "@/components/RalatedPostBlogItem";
import React, { useEffect } from "react";

const RelatedPostBlog = ({ blogs }) => {
    return (
        <div className="related-posts">
            <h3 className="title">Related Posts</h3>
            {!!blogs && (
                <div
                    className="owl-carousel owl-simple"
                    data-toggle="owl"
                    data-owl-options='{
                              "nav": false, 
                              "dots": true,
                              "margin": 20,
                              "loop": false,
                              "responsive": {
                                  "0": {
                                      "items":1
                                  },
                                  "480": {
                                      "items":2
                                  },
                                  "768": {
                                      "items":3
                                  }
                              }
                          }'
                >
                    {blogs?.map((blog, index) => {
                        return (
                            <RalatedPostBlogItem
                                key={blog?.id || new Date().getTime() + index}
                                {...blog}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default RelatedPostBlog;
