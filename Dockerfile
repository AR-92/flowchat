FROM nginx:alpine

# Copy all project files to nginx html directory
COPY . /usr/share/nginx/html

# Set proper permissions for nginx to access files
RUN chmod -R 644 /usr/share/nginx/html/
RUN chmod -R 755 /usr/share/nginx/html/
RUN chown -R nginx:nginx /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
