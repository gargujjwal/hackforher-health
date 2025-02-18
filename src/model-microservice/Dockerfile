FROM continuumio/miniconda3:25.1.1-2

WORKDIR /app

# Copy environment file and create conda environment
COPY environment.yml .
RUN conda env create -f environment.yml

# Make RUN commands use the new environment
ENV PATH=/opt/conda/envs/project-1/bin:$PATH

# Copy application code
COPY . .

EXPOSE 5000
CMD ["gunicorn", "-w 4", "-b 0.0.0.0:5000" ,"app:app"]
