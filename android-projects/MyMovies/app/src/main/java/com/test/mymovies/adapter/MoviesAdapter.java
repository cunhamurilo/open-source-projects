package com.test.mymovies.adapter;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.Message;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.test.mymovies.model.MoviesList;
import com.test.mymovies.R;
import com.test.mymovies.activity.MainActivity;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class MoviesAdapter  extends RecyclerView.Adapter<MoviesAdapter.MyViewHolder>{

    // Variables
    private Context context;
    private ArrayList<MoviesList> moviesLists;
    private SharedPreferences mPrefs;
    private SharedPreferences.Editor prefsEditor;

    // Constructor
    public MoviesAdapter(Context context, ArrayList<MoviesList> moviesLists) {
        this.context = context;
        this.moviesLists = moviesLists;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v;
        v = LayoutInflater.from(context).inflate(R.layout.movies_adapter, parent, false);
        MyViewHolder myViewHolder = new MyViewHolder(v);

        return myViewHolder;
    }

    @Override
    public void onBindViewHolder(final MyViewHolder holder, final int position) {
        // Adds the values for the fields
        holder.title.setText(moviesLists.get(position).getTitle());
        Glide.with(context).load(moviesLists.get(position).getPoster_url()).into(holder.poster_url);

        // Check if the user clicked on a movie
        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                JSONObject moviechosen = new JSONObject();
                try {
                    moviechosen.put("id", moviesLists.get(position).getId());
                    moviechosen.put("vote_average", moviesLists.get(position).getVote_average());
                    moviechosen.put("title", moviesLists.get(position).getTitle());
                    moviechosen.put("poster_url", moviesLists.get(position).getPoster_url());
                    moviechosen.put("release_date", moviesLists.get(position).getRelease_date());
                    moviechosen.put("genres", moviesLists.get(position).getGenres());

                } catch (JSONException e) {
                    e.printStackTrace();
                }

                toActivity(moviechosen.toString(),moviesLists.get(position).getId()+"");
            }
        });

    }

    @Override
    public int getItemCount() {
        return moviesLists.size();
    }

    // Function send data to another activity
    private void toActivity(String json, String id) {
        Message message = new Message();
        Bundle bundle = new Bundle();
        bundle.putString("movie",json);
        bundle.putString("id",id);
        message.setData(bundle);

        MainActivity.handler.sendMessage(message);
    }

    public static class MyViewHolder extends RecyclerView.ViewHolder{

        TextView title;
        ImageView poster_url;

        public MyViewHolder(View itemView) {
            super(itemView);

            // Holder add variable to object
            title = itemView.findViewById(R.id.tv_title_movie_main);
            poster_url = itemView.findViewById(R.id.imageView);

        }

    }

}